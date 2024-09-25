import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [taskInput, setTaskInput] = useState(''); // State for new task input
  const [editIndex, setEditIndex] = useState(null); // State for keeping track of which task is being edited
  const [editInput, setEditInput] = useState(''); // State for storing the value of the task being edited

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput(''); // Clear the input field
    }
  };

  // Delete task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
  };

  // Set task for editing
  const editTask = (index) => {
    setEditIndex(index);
    setEditInput(tasks[index]);
  };

  // Save edited task
  const saveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editInput;
    setTasks(updatedTasks);
    setEditIndex(null);
  };

  return (
    <div>
      <style>{`
        .container {
          background-color: #282c34;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .title {
          color: #61dafb;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 2rem;
          text-align: center;
          margin-bottom: 1rem;
        }
        .task-form {
          background-color: #343a40;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }
        .task-form h4, .task-list h4 {
          color: white;
        }
        .form-control {
          border: 2px solid #61dafb;
          transition: all 0.3s ease-in-out;
        }
        .btn-primary {
          background-color: #61dafb;
          border: none;
        }
        .task-list {
          background-color: #343a40;
          padding: 20px;
          border-radius: 8px;
        }
        .list-group-item {
          background-color: #444b55;
          color: white;
          border: none;
          transition: background-color 0.3s ease;
        }
        .list-group-item:hover {
          background-color: #505a66;
        }
        .btn-success, .btn-danger, .btn-secondary {
          border: none;
        }
        .btn-success {
          background-color: #28a745;
        }
        .btn-danger {
          background-color: #dc3545;
        }
        .btn-secondary {
          background-color: #6c757d;
        }
      `}</style>

      <div className="container">
        <h1 className="title">Todo Application</h1>

        {/* Form for creating a new task */}
        <div className="task-form">
          <h4>Create a New Task</h4>
          <form onSubmit={addTask}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter a new task"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                aria-label="Enter a new task"
              />
              <button className="btn btn-primary" type="submit">
                Add Task
              </button>
            </div>
          </form>
        </div>

        {/* Display the list of tasks */}
        <div className="task-list">
          <h4>Your Tasks</h4>
          <ul className="list-group">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    <span>{task}</span>
                  )}
                  <div>
                    {editIndex === index ? (
                      <>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => saveTask(index)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm ms-2"
                          onClick={() => setEditIndex(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => editTask(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => deleteTask(index)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item text-center">
                No tasks yet. Add a new task to get started.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
