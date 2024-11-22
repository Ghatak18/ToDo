import React, { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim()) {
      onAddTodo(todo);
      setTodo("");
    }
  };

  return (
    <div className="flex justify-center items-center h-auto bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-slate-200 text-lg font-semibold mb-4 text-center">
          Add a To-Do
        </h2>
        <div className="flex flex-col">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter your task..."
            className="bg-slate-700 text-slate-300 placeholder-slate-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 mb-4"
          />
          <button
            type="submit"
            className="bg-slate-600 hover:bg-slate-500 text-slate-200 font-semibold py-2 rounded-md transition"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
