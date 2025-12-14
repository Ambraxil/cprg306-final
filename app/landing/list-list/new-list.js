"use client";

import { useState } from "react";
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];

export default function NewList({ onAddList }) {
  const [title, setTitle] = useState("");
  const [dateCreated, setDateCreated] = useState(formattedDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newList = {
      title: title.trim(),
      dateCreated: dateCreated || null,
    };

    onAddList(newList); // Firestore ID will be added in page.js
    // Clear form
    setTitle("");
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    setDateCreated(formattedDate);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4 p-2 border rounded bg-white shadow justify-center max-w-xl mx-auto">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="List title"
        className="p-2 border rounded w-full"
        required
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
      >
        Add List
      </button>
    </form>
  );
}