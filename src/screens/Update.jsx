import React, { useEffect, useState,useRef } from 'react'; // Add the missing import for 'useState'
import { useParams, useNavigate } from 'react-router-dom';

export default function Update() {
  const { id } = useParams();
  const isInitialMount = useRef(true);
  const navigate=useNavigate();
  const [status, setStatus] = useState('pending');

  const [obj, setObj] = useState({
    title: '',
    desc: '',
    dueDate: ''
  });

  const data = async () => {
    try {
      let response = await fetch('http://localhost:8000/findTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail'),
          id: id
        })
      });
      if (response.ok) {
        let a= await response.json();
        
        return a;
        
        
      } else {
        console.error('Failed to fetch task data:', response.status);
       
      }
    } catch (error) {
      console.error('Error while fetching task data:', error);
      
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      let fetchedData = await data();
      setObj(fetchedData);
      console.log("obj =",obj);
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchData(); 
    }
  }, []);

  const TaskForm = () => {
    
      
     
    const initialFormState = {
      taskDetail: obj.title,
      taskDescription: obj.desc,
      dueDate: obj.dueDate,
      status:status
    };

    const [formValues, setFormValues] = useState(initialFormState);
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Handle radio button change separately from other form inputs
        if (name === 'status') {
          setStatus(value);
        } else {
          setFormValues({
            ...formValues,
            [name]: value,
          });
        }
      };

    const handleSubmit =async (e) => {
      e.preventDefault();
      console.log(formValues)
      let response=await fetch('http://localhost:8000/updateTask',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:localStorage.getItem("userEmail"),
            id:id,
            obj:formValues

        })

    })
    if(response.ok){
        alert("Task Updated Successfully");
        navigate('/');
     }
      
    };

    const handleDelete=async ()=>{
      console.log(id);

    let response=await fetch('http://localhost:8000/deleteTask',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:localStorage.getItem("userEmail"),
            id:id
        })

    })

    if(response.ok){
       alert("Task Deleted Successfully");
       navigate('/');
    }
    }

    
    

    return (
      <div className="container mt-5">
        <div className="task-form p-4 rounded shadow">
          <h2 className="text-center mb-4">Update Task</h2>
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

            <div className="form-group">
            <label>Status:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="pending"
                  checked={status === 'pending'}
                  onChange={handleChange}
                />{' '}
                Pending
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input
                  type="radio"
                  name="status"
                  value="not"
                  checked={status === 'not'}
                  onChange={handleChange}
                />{' '}
                Not
              </label>
           </div>
           </div>


            
            <button type="submit" className="btn btn-primary btn-block mt-3">
           
            Update
            </button>
           
          </form>
          <button type="delete" onClick={handleDelete} className="btn btn-primary btn-block mt-3">Delete</button>   
        </div>
      </div>
    );
  };

  return <TaskForm />;
}