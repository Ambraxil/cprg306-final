"use client";

import { useState } from "react";
import { updateTask } from "../_services/task-list-service";

const TaskDetailsEditor = ({ task, list, user, onUpdate, onUpdateList }) => {
  const [editing, setEditing] = useState(false);
  const [details, setDetails] = useState(task.details || "");

  const handleSave = async () => {
    if (!user) return;
    try {
      await updateTask(user.uid, list, task.id, { details });
      const updatedTask = { ...task, details };
      onUpdate(updatedTask);
      onUpdateList(updatedTask);
      setEditing(false);
    } catch (error) {
      console.error("Failed to update task details:", error);
    }
  };

  return (
    <div className="mt-4">
      {editing ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:cursor-pointer hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setDetails(task.details || "");
              }}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:cursor-pointer hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-gray-700">{task.details || "No details provided."}</p>
          <button
            onClick={() => setEditing(true)}
            className="ml-2 px-3 py-1 bg-indigo-500 text-white rounded hover:cursor-pointer hover:bg-indigo-600"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskDetailsEditor;
