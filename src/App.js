import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid"; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    const storedTasks  = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); 

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObject = { id: uuidv4(), text: newTask, completed: false }; 
    setTasks([...tasks, newTaskObject]);
    setNewTask("");
  
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (id) => {
    setEditedTask(id);
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setNewTask(taskToEdit.text);
    }
  };

  const saveEditedTask = () => {
    if (editedTask !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editedTask ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
      setEditedTask(null);
      setNewTask("");
    }
  };

  return (
    <div className="center-container">
      <h1 >Todos List</h1>
      <div >
        <input
          type="text"
          placeholder="Add new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {editedTask === task.id ? (
              <>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={saveEditedTask}>Save</button>
              </>
            ) : (
              <span>{task.text}</span>
            )}
            <button onClick={() => editTask(task.id)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
