import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskProvider } from '../components/States';

export default function ItemListing() {
    const { arr, fetchData } = useContext(TaskProvider);
    const navigate = useNavigate();
    const [sortedTasks, setSortedTasks] = useState([]); // State to hold sorted tasks
    const [sortOption, setSortOption] = useState('dueDate'); // State to hold the selected sorting option

    const updateTask = (id) => {
        navigate(`/updateTask/${id}`);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Update sorted tasks when arr or sortOption changes
        sortTasks();
    }, [arr, sortOption]);

    const sortTasks = () => {
        // Create a copy of the original tasks array to avoid modifying the original state
        const tasksCopy = [...arr];

        // Sort tasks based on the selected sort option
        switch (sortOption) {
            case 'dueDate':
                tasksCopy.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                break;
            case 'status':
                tasksCopy.sort((a, b) => (a.status === "not" ? -1 : 1));
                break;
            // Add more cases for additional sorting options if needed
            default:
                break;
        }

        setSortedTasks(tasksCopy);
    };

    return (
        <div>
            {arr.length >= 1 ? (
                <section className="vh-100" style={{ background: "" }}>
                  
                    <div>
                        <button onClick={() => setSortOption('dueDate')}>Sort by Due Date</button>
                        <button onClick={() => setSortOption('status')}>Sort by Status</button>
                      
                    </div>

                    <div className="container py-5 h-200">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-12 col-xl-10">

                                <div className="card">
                                    <div className="card-header p-3">
                                        <h5 className="mb-0"><i className="fas fa-tasks me-2"></i>Task List</h5>
                                    </div>
                                    <div className="card-body" data-mdb-perfect-scrollbar="true" style={{ position: "relative; height: 400px" }}>

                                        <table className="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Task Description</th>
                                                    <th scope="col">Task</th>
                                                    <th scope="col">Due Date</th>
                                                    <th scope="col">Actions</th>
                                                    <th scope='col'>Delete/Customize/Show Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortedTasks.map((task) => {
                                                    return (
                                                        <tr className="fw-normal" key={task.id}>
                                                            <th>
                                                                <span className="ms-2">{task.desc}</span>
                                                            </th>
                                                            <td className="align-middle">
                                                                <span>{task.title}</span>
                                                            </td>
                                                            <td className="align-middle">
                                                                <h6 className="mb-0"><span className="badge bg-danger">{task.dueDate}</span></h6>
                                                            </td>
                                                            <td className="align-middle">
                                                                <button>{task.status === "not" ? "Completed" : "Pending"}</button>
                                                            </td>
                                                            <td className="align-middle">
                                                                <button onClick={() => { updateTask(task.id) }}>Click me</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div></div>
            )}
        </div>
    );
}