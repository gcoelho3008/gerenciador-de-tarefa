import React, { useEffect, useState } from "react";
import "./App.css";

type Task = {
  id: number;
  title: string;
  content: string;
  isFavorite: boolean;
  color: string;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "task title 1", content: "content 1", isFavorite: false, color: "#ffffff" },
    { id: 2, title: "task title 2", content: "content 2", isFavorite: false, color: "#ffffff" },
    { id: 3, title: "task title 3", content: "content 3", isFavorite: false, color: "#ffffff" },
    { id: 4, title: "task title 4", content: "content 4", isFavorite: false, color: "#ffffff" },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/task")

        const task: Task[] = await response.json()

        setTasks(task)
      } catch (e) {
        console.log(e)
        
      }
    };

    fetchNotes();

  }, []);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setContent(task.content);
    setColor(task.color);
  }

  const handleAddTask = async (
    event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content
          })
        }
      );
      const newTask = await response.json();

      setTasks([newTask, ...tasks]);
      setTitle("");
      setContent("");
      setColor("#ffffff");
      
    } catch (e) {
      console.log(e)
      
    }
  
  }

  const handleUpdateTask = async (
    event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedTask) {
      return;
    }
   
    try {
      const response = await fetch(
        `http://localhost:5000/api/task/${selectedTask.id}`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content,
          })
        }
      )

      const updatedTask = await response.json();
    
      const updatedTaskList = tasks.map((task) =>
        task.id === selectedTask.id ? updatedTask : task
      )
      setTasks(updatedTaskList);
      setTitle("");
      setContent("");
      setColor("#ffffff");
      setSelectedTask(null);
    
  
    } catch (e) {
      console.log(e)
      
    }
  }

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setColor("#ffffff");
    setSelectedTask(null);
  };

  const deleteTask = async (
    event: React.MouseEvent, taskId: number) => {
    event.stopPropagation();

    try {
      await fetch(
        `http://localhost:5000/api/task/${taskId}`,
        {
          method: "DELETE",
          
        }
      )
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    } catch (e) {
      
    }
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleFavorite = (event: React.MouseEvent, taskId: number) => {
    event.stopPropagation();
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isFavorite: !task.isFavorite } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="app-container">
      <form className="task-form" onSubmit={(event) => 
        selectedTask ? handleUpdateTask(event) : handleAddTask(event)
      }>
        <input 
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        />
        <input 
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          required
        />
        {selectedTask ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Task</button>
        )}
      </form>
      <div className="task-grid">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className={`task-item ${task.isFavorite ? "favorite" : ""}`}
            style={{ backgroundColor: task.color }}
            onClick={() => handleTaskClick(task)}
          >
            <div className="task-header">
              <button onClick={(event) => deleteTask(event, task.id)}>x</button>
              <button onClick={(event) => toggleFavorite(event, task.id)}>
                {task.isFavorite ? "★" : "☆"}
              </button>
            </div>
            <h2>{task.title}</h2>
            <p>{task.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
