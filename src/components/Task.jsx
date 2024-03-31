import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Task(props) {
  const {
    show,
    setShow
  } = props;
  
  const handleClose = () => setShow(false);

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  const handleSelect = (date) => {
      setSelectedDateTime(date);
  };
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task Description..."
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Quantity...."
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Frequency</Form.Label>
              <Form.Control
                type="text"
                placeholder="Frequency...."
                autoFocus
              />
            </Form.Group>
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