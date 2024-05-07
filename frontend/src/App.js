import './App.css';
import axios from "axios";
import Todo from './components/Todo';
import { useEffect, useState } from 'react';

function App() {
  const [ToDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState("");

  const fetchTodo = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/gettodo");
      setToDo(response.data.task);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  const Change = (e) => {
    const { value } = e.target;
    setNewTask(value);
  }

  const Add = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/v1/add", { Task: newTask })
      .then((res) => {
        console.log(res.data.message);
        fetchTodo();
      })
      .catch(error => {
        console.error("Error adding task:", error);
      });
    setNewTask("");
  }

  const handleUpdate = async (id) => {
    setShowUpdateForm(true);
    setSelectedTaskId(id);
    const selectedTask = ToDo.find(task => task._id === id);
    setUpdatedTask(selectedTask.Task);
  }

  const updateTodo = async () => {
    try {
      await axios.put(`http://localhost:5000/api/v1/updatetodo/${selectedTaskId}`, { Task: updatedTask });
      fetchTodo();
      setShowUpdateForm(false);
      setSelectedTaskId(null);
      setUpdatedTask("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  const handleInputChange = (e) => {
    setUpdatedTask(e.target.value);
  }

  const handleSubmit = () => {
    updateTodo();
  }

  const deletetodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/v1/deletetodo/${id}`)
      if (response.status === 200) {
        setToDo(ToDo.filter((task) => task._id !== id));
      } else {
        alert("failed to delete todo");
      }
    } catch (error) {
      console.log("error:", error);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input type="text" placeholder="ADD TODOs..." name="Task" onChange={Change} value={newTask} />
          <div className="add" onClick={Add}>Add</div>
        </div>
        <div className="list">
          {ToDo.map((item) => (
            <div key={item._id}>
              <Todo id={item._id} text={item.Task} deletetodo={() => deletetodo(item._id)} updatetodo={handleUpdate} />

              {showUpdateForm && selectedTaskId === item._id && (
                <div className="update">
                  <input
                    type='text'
                    value={updatedTask}
                    onChange={handleInputChange}
                  />
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
