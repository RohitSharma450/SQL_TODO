import React, { useState, useEffect } from "react";
import "../style/Todo.css";
import axios from "axios";

const Practice = () => {
  const [taskInput, setTaskInput] = useState("");
  const [task, setTask] = useState([]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    try {
      const res = await axios.post(`http://localhost:9090/api/create`, {
        data: taskInput,
      });

      setTask((prev) => [...prev, res.data.data]);
      setTaskInput("");
    } catch (error) {
      console.log("CREATE ERROR:", error);
    }
  };

  const toggleCompletion = async (id) => {
    try {
      const currentTodo = task.find((t) => t.id === id);
      if (!currentTodo) return;

      const res = await axios.put(`http://localhost:9090/api/completed/${id}`, {
        completed: !currentTodo.completed,
      });

      setTask((prev) => prev.map((t) => (t.id === id ? res.data.data : t)));
    } catch (error) {
      console.log("TOGGLE ERROR:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/api/delete/${id}`);

      setTask((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  useEffect(() => {
    const fetchTodoData = async () => {
      try {
        const res = await axios.get(`http://localhost:9090/api/todo`);
        setTask(res.data.data);
      } catch (error) {
        console.log("FETCH ERROR:", error);
      }
    };

    fetchTodoData();
  }, []);

  return (
    <div className="todo-container">
      <div className="header">
        <p className="title">Todo Application...</p>
        <form onSubmit={addTask} className="input-container">
          <input
            type="text"
            className="task-input"
            placeholder="Enter a task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button className="add-task-btn">+</button>
        </form>
      </div>
      <ul className="task-list">
        {Array.isArray(task) &&
          task.map((t) => (
            <li key={t.id} className="task-item">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleCompletion(t.id)}
              />
              <p
                className={`task-text ${t.completed ? "completed" : ""}`}
                onClick={() => toggleCompletion(t.id)}
              >
                {t.data}
              </p>
              <button className="delete-btn" onClick={() => deleteTask(t.id)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Practice;
