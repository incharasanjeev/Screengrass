
import React, { useContext, useState } from 'react';
import './TaskForm.css';
import { TaskProvider } from './States';



const TaskForm = () => {
  const initialFormState = {
    taskDetail: '',
    taskDescription: '',
    dueDate: '',
  };
  
  const [formValues, setFormValues] = useState(initialFormState);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const {addTask}=useContext(TaskProvider);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
   addTask(formValues.taskDetail,formValues.taskDescription,formValues.dueDate);


    setShowSuccessPopup(true); 
    setFormValues(initialFormState);
  };

 
  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="container mt-5">
      <div className="task-form p-4 rounded shadow">
        <h2 className="text-center mb-4">Task Form</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="taskDetail">Task Detail:</label>
            <input
              type="text"
              className="form-control"
              id="taskDetail"
              name="taskDetail"
              placeholder="Enter task detail"
              value={formValues.taskDetail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="taskDescription">Task Description:</label>
            <textarea
              className="form-control"
              id="taskDescription"
              name="taskDescription"
              rows="3"
              placeholder="Enter task description"
              value={formValues.taskDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              name="dueDate"
              value={formValues.dueDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">
            Submit
          </button>
        </form>
      </div>

      {showSuccessPopup && (
        <div className="success-popup">
          <div className="success-popup-content">
            <button className="close-btn" onClick={handleClosePopup}>
              &times;
            </button>
            <p>Task added successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;