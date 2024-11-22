import React from "react";

const TaskList = ({ tasks }) => {
  return (
    <div className="bg-slate-900 p-4 rounded-lg shadow-md w-80">
      <h2 className="text-slate-200 text-lg font-semibold mb-4 text-center">
        Your Tasks
      </h2>
      {tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="bg-slate-800 text-slate-300 px-4 py-2 rounded-md"
            >
              {task}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-center">No tasks added yet!</p>
      )}
    </div>
  );
};

export default TaskList;
