"use client";

import Task from "./task";
import { useState } from "react";

const TaskList = ({ tasks, setTasks, onTaskSelect }) => {
  const [sortBy, setSortBy] = useState("title");

  const moveTaskUp = (index) => {
    if (index === 0) return;
    const newTasks = [...tasks];
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    setTasks(newTasks);
  };

  const moveTaskDown = (index) => {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
    setTasks(newTasks);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "start") {
      return (a.startTime || "").localeCompare(b.startTime || "");
    }

    if (sortBy === "end") {
      return (a.endTime || "").localeCompare(b.endTime || "");
    }

    if (sortBy === "completed") {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    }

    return 0;
  });

  return (
    <div className="max-w-xl mx-auto mt-6">
      <ul>
        {sortedTasks.map((task, index) => (
          <li key={task.id} className="flex items-center gap-4">
            <Task
              title={task.title}
              startTime={task.startTime}
              endTime={task.endTime}
              completed={task.completed}
              onSelect={() => onTaskSelect(task)}
              onToggleComplete={() => {
                const updated = [...tasks];
                updated[index].completed = !updated[index].completed;
                setTasks(updated);
              }}
              onExport={() => console.log("Export", task)}
            />

            <button
              onClick={() => moveTaskUp(index)}
              className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              ↑
            </button>

            <button
              onClick={() => moveTaskDown(index)}
              className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              ↓
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mt-6 justify-center text-xl">
        <button
          onClick={() => setSortBy("title")}
          className={`px-4 py-2 rounded ${
            sortBy === "title" ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
        >
          Sort by Title
        </button>

        <button
          onClick={() => setSortBy("start")}
          className={`px-4 py-2 rounded ${
            sortBy === "start" ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
        >
          Sort by Start Time
        </button>

        <button
          onClick={() => setSortBy("end")}
          className={`px-4 py-2 rounded ${
            sortBy === "end" ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
        >
          Sort by End Time
        </button>

        <button
          onClick={() => setSortBy("completed")}
          className={`px-4 py-2 rounded ${
            sortBy === "completed" ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
        >
          Sort by Completion
        </button>
      </div>
    </div>
  );
};

export default TaskList;
