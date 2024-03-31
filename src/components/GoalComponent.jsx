import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Task from './Task';
import { db, auth, storage } from "../firebase";
import { toast } from 'react-toastify';
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const DEFAULT_GOAL = {
    userId: "",
    description: "",
    startDate: new Date(),
    endDate: new Date() ,
    taskArr: [
      
    ] 
}

const GoalComponent = () => {
    const navigate = useNavigate();
    const [selectedRange, setSelectedRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const [show, setShow] = useState(false);
    const [goalInput, setGoalInput] = useState(DEFAULT_GOAL)

    const handleDateSelect = (ranges) => {
        setGoalInput(prev => ({
            ...prev,
            startDate: ranges.selection.startDate,
            endDate: ranges.selection.endDate,
        })) 
        setSelectedRange(ranges.selection);
    }

    const goalsCollectionRef = collection(db, "goal_collection");

    const getMovieList = async () => {
        try {
          const data = await getDocs(goalsCollectionRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
        } catch (err) {
          console.error(err);
        }
      };

    const handleSubmit = async(event) => {
        event.preventDefault(); 

        try {
            const res = await addDoc(goalsCollectionRef, {
              ...goalInput,
              userId: auth?.currentUser?.uid,
            });
            toast.success('Goal added successfully!!', {
                position: "top-center",
                autoClose: 5000,
            });
            setGoalInput(DEFAULT_GOAL);
            navigate("/");

          } catch (err) {
            toast.error('Error occured while adding goal. Please try again.', {
                position: "top-center",
                autoClose: 5000,
            });
            console.error(err);
          }
    }
    
    const handleChange = (e) => {
        const key = e?.target?.name;

        setGoalInput(prev => ({
            ...prev,
            [key]: e?.target?.value,
        }));
    }

    useEffect(() => {
        getMovieList()
    }, [])

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="row g-3 align-items-center mb-2">
                <div className="col-auto">
                    <label htmlFor="description" className="col-form-label">Description</label>
                </div>
                <div className="col-4">
                    <input type="text" onChange={handleChange} name='description' id="description" className="form-control" aria-describedby="passwordHelpInline" />
                </div>
            </div>
            <div className="row g-3 align-items-center ">
                <div className="col-auto">
                    <label htmlFor="inputPassword6" className="col-form-label">Select Goal Duration</label>
                </div>
                <div className="col-4">
                    <DateRange
                        ranges={[selectedRange]}
                        onChange={handleDateSelect}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        minDate={new Date()}
                        showSelectionPreview={true}
                    />
                </div>
            </div>
            <button type="button" className="btn btn-primary mb-5" onClick={() => setShow(true)}>Add Task</button>
            <div className='row w-50 mx-auto'>
                 <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
        {
            show && <Task show={show} setShow={setShow} setGoalInput={setGoalInput}/>
            
        }
        </>
    )
}

export default GoalComponent;
