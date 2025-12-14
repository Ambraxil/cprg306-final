"use client";

import List from "./list";
import { useState } from "react";
import { deleteList } from "../_services/list-list-service";

export default function ListList({user, lists, setLists, onSelectList}) {
    const [sortBy, setSortBy] = useState("");

    const handleDeleteList = async (listId) => {
    if (!user) return;
    try {
        await deleteList(user.uid, listId);
        setLists((prev) => prev.filter((list) => list.id !== listId));
    } catch (error) {
        console.error("Failed to delete list:", error);
    }};

    const moveListUp = (index) => {
    setSortBy("");
    if (index === 0) return;
    setLists((prev) => {
        const newLists = [...prev];
        [newLists[index - 1], newLists[index]] = [newLists[index], newLists[index - 1]];
        return newLists;
    });
    };

    const moveListDown = (index) => {
    setSortBy("");
    setLists((prev) => {
        if (index === prev.length - 1) return prev;
        const newLists = [...prev];
        [newLists[index + 1], newLists[index]] = [newLists[index], newLists[index + 1]];
        return newLists;
    });
    };

    const displayedLists = sortBy
    ? [...lists].sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "dateCreated") return (a.dateCreated || "").localeCompare(b.dateCreated || "");
        return 0;
    })
    : lists;

    return (
        <div className="max-w-xl mx-auto mt-6">
        <ul>
            {displayedLists.map((list, index) => (
            <li key={list.id} className="flex items-start gap-4">
                <List
                id={list.id}
                title={list.title}
                dateCreated={list.dateCreated}
                onSelect={() => onSelectList(list.id)}
                onDelete={() => handleDeleteList(list.id)}
                />

                <div className="flex flex-col space-y-1 mt-2">
                <button
                    type="button"
                    onClick={() => moveListUp(index)}
                    className="px-2 py-1 bg-gray-400 text-white rounded hover:cursor-pointer hover:bg-gray-500"
                >
                    ↑
                </button>
                <button
                    type="button"
                    onClick={() => moveListDown(index)}
                    className="px-2 py-1 bg-gray-400 text-white rounded hover:cursor-pointer hover:bg-gray-500"
                >
                    ↓
                </button>
                </div>
            </li>
            ))}
        </ul>

        <div className="flex flex-wrap gap-2 mt-6 justify-center text-xl">
        {["title", "date created"].map((key) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`px-4 py-2 rounded hover:cursor-pointer ${
              sortBy === key ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
          >
            Sort by {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}

        {sortBy && (
          <button
            onClick={() => setSortBy("")}
            className="px-4 py-2 rounded bg-red-500 text-white hover:cursor-pointer"
          >
            Clear Sorting
          </button>
        )}
      </div>
        </div>
    );
};