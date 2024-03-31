import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';

function Task(props) {
  const {
    show,
    setShow,
    setGoalInput,
  } = props;
  
  const [task, setTask] = useState({
    id: "",
    taskDescription: "",
    quantity: "",
    frequency: "",
    reminders: [],
    isCompleted: "",
    currentFrequency: "",
  });

  const handleClose = () => {
    setGoalInput(prev => ({
      ...prev,
      taskArr: [ {
        ...task,
        id: uuidv4(),
        isCompleted: false,
        currentFrequency: 0,
      }]
    }))
    setShow(false)
  }

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  const handleSelect = (date) => {
      console.log('the val is', date)
      setTask((prev) => ({
        ...prev,
        reminders: [...prev.reminders, date]
      }))
      setSelectedDateTime(date);
  };

  const onChange = (e) => {
    const key = e?.target?.name;
    
    setTask((prev) => ({ ...prev, [key]: e?.target?.value }));
  }
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label htmlFor='taskDescription'>Task Description</Form.Label>
              <Form.Control
                type="text"
                name='taskDescription'
                id='taskDescription'
                placeholder="Task Description..."
                autoFocus
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label >Quantity</Form.Label>
              <Form.Control
                type="text"
                name='quantity'
                placeholder="Quantity...."
                autoFocus
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Frequency</Form.Label>
              <Form.Control
                type="text"
                name='frequency'
                id='frequency'
                placeholder="Frequency...."
                autoFocus
                onChange={onChange}
              />
            </Form.Group>

            <ul class="list-group mb-2">
              {
                task.reminders.length > 0 && task.reminders.map((time, i) => <li class="list-group-item">Reminder {i+1}: {new Date(time).toLocaleString()}</li>)
              }
            </ul>

            <DatePicker
              selected={selectedDateTime}
              onChange={handleSelect}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
           />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Task;