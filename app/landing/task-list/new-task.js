'use client';

import { useState } from 'react';

function NewTask({ onAddTask, onDeleteTask }) {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const task = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      startTime,
      endTime,
      completed: false,
    };

    onAddTask(task);

    // Reset form
    setTitle('');
    setStartTime('');
    setEndTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white mb-6">
      {/* Title */}
      <div className="mb-4 text-black">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Start Time */}
      <div className="mb-4 text-black">
        <label className="block mb-1">Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* End Time */}
      <div className="mb-4 text-black">
        <label className="block mb-1">End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Add Task Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
      >
        Add Task
      </button>

      {/* Delete ALL Tasks Button — optional */}
      {onDeleteTask && (
        <button
          type="button"
          onClick={onDeleteTask}
          className="w-full mt-3 py-2 px-4 bg-red-500 text-white font-semibold rounded hover:bg-red-700"
        >
          Delete Selected Task
        </button>
      )}
    </form>
  );
}

export default NewTask;
