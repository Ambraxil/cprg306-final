"use client";

import Task from "./task";
import { useState } from "react";
import { deleteTask } from "../_services/task-list-service";

const TaskList = ({ user, tasks, setTasks, onTaskSelect, onToggleComplete }) => {
  const [sortBy, setSortBy] = useState("");

  const handleDeleteTask = async (taskId) => {
    if (!user) return;
    try {
      await deleteTask(user.uid, taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const moveTaskUp = (index) => {
    if (index === 0) return;
    setTasks((prev) => {
      const newTasks = [...prev];
      [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
      return newTasks;
    });
  };

  const moveTaskDown = (index) => {
    setTasks((prev) => {
      if (index === prev.length - 1) return prev;
      const newTasks = [...prev];
      [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
      return newTasks;
    });
  };

  const displayedTasks = sortBy
    ? [...tasks].sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "start") return (a.startTime || "").localeCompare(b.startTime || "");
        if (sortBy === "end") return (a.endTime || "").localeCompare(b.endTime || "");
        if (sortBy === "completed") return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        return 0;
      })
    : tasks;

  return (
    <div className="max-w-xl mx-auto mt-6">
      <ul>
        {displayedTasks.map((task, index) => (
          <li key={task.id} className="flex items-start gap-4">
            <Task
              id={task.id} // always Firestore document ID
              title={task.title}
              startTime={task.startTime}
              endTime={task.endTime}
              completed={task.completed}
              onSelect={() => onTaskSelect(task)}
              onToggleComplete={() => onToggleComplete(task.id, !task.completed)}
              onDelete={() => handleDeleteTask(task.id)}
              onExport={() => console.log("Export", task)}
            />

            <div className="flex flex-col space-y-1 mt-2">
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
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mt-6 justify-center text-xl">
        {["title", "start", "end", "completed"].map((key) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`px-4 py-2 rounded ${
              sortBy === key ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
          >
            Sort by {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}

        {sortBy && (
          <button
            onClick={() => setSortBy("")}
            className="px-4 py-2 rounded bg-red-500 text-white"
          >
            Clear Sorting
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskList;
