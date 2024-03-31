import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Task from './Task';
import { db, auth, storage } from "../firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const GoalComponent = () => {
    const [selectedRange, setSelectedRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const [show, setShow] = useState(false);
    const [goalInput, setGoalInput] = useState({
      userId: "",
      description: "",
      startDate: new Date(),
      endDate: new Date() ,
      taskArr: [
        
      ] 
    })

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
        event.preventDefault(); // Prevent default form submission behavior
        console.log('inside submit', auth);
    
        debugger
        try {
            const res = await addDoc(goalsCollectionRef, {
              ...goalInput
            });
            console.log('the res', res);
          } catch (err) {
            console.error(err);
          }
    }
    
    const handleChange = (e) => {
        setGoalInput(e?.target?.name, e?.target?.value);
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
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <button className="btn btn-primary" onClick={() => setShow(true)}>Add Task</button>
        {
            show && <Task show={show} setShow={setShow} setGoalInput={setGoalInput}/>
            
        }
        </>
    )
}

export default GoalComponent;
