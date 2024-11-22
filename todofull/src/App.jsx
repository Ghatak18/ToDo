import { useState } from "react";
import "./App.css";
import TodoForm from "./Form/Form";
import TaskList from "./taskList/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);  // state to hold all tasks

  // Function to handle adding new tasks
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);  // Add task to list
  };

  return (
    <div className="bg-black h-screen w-screen flex flex-col justify-center items-center space-y-6">
      <h1 className="text-slate-300 font-bold">This is your Todo List</h1>

      {/* Pass the tasks array as a prop */}
      <TaskList tasks={tasks} />

      {/* Pass addTask function to TodoForm so it can add tasks */}
      <TodoForm onAddTodo={addTask} />
    </div>
  );
}

export default App;
