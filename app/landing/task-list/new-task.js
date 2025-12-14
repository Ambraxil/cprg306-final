"use client";

import { useState } from "react";

const NewTask = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title: title.trim(),
      startTime: startTime || null,
      endTime: endTime || null,
      details: details || "",
      completed: false,
    };

    onAddTask(newTask); // Firestore ID will be added in page.js
    // Clear form
    setTitle("");
    setStartTime("");
    setEndTime("");
    setDetails("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4 p-2 border rounded bg-white shadow">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="p-2 border rounded w-full"
        required
      />

      <div className="flex gap-2">
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="p-2 border rounded flex-1"
          placeholder="Start Time"
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="p-2 border rounded flex-1"
          placeholder="End Time"
        />
      </div>

      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Task details"
        className="p-2 border rounded w-full"
        rows={3}
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer hover:bg-blue-600 mt-2"
      >
        Add Task
      </button>
    </form>
  );
};

export default NewTask;
