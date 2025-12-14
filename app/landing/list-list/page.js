"use client";

import { useState, useEffect } from "react";
import ListList from "./list-list";
import NewList from "./new-list";
import { addList, getLists} from "../_services/list-list-service";
import { useUserAuth } from "../_utils/auth-context";

export default function ListPage() {
  const { user } = useUserAuth();
  const [lists, setLists] = useState([]);

    const loadLists = async () => {
    if (!user) return;
    const data = await getLists(user.uid);
    setLists(data); // Firestore IDs are used here
    };

    useEffect(() => {
    if (user) loadLists();
    }, [user]);

    const handleAddList = async (lists) => {
    if (!user) return;
    const docId = await addList(user.uid, lists); // Firestore document ID
    setLists((prev) => [...prev, { ...lists, id: docId }]);
    }


    if (!user) {
    return (
      <div className="min-h-screen bg-gray-300 text-blue-900 flex flex-col items-center justify-center p-6">
        <header className="w-full text-left pb-4 mb-6 border-b-4 border-blue-900">
          <h1 className="text-3xl font-bold">Swift List</h1>
        </header>
        <h1 className="text-3xl font-bold mb-4">Secured Page</h1>
        <p className="text-lg text-center">
          Please sign in to access the list features.
        </p>
      </div>
    );
  }

    return (
    <div className="min-h-screen bg-gray-100 text-blue-900 p-6">
      <header className="w-full text-left pb-4 mb-6 border-b-4 border-blue-900">
        <h1 className="text-3xl font-bold">Swift List</h1>
        </header>
        <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
                <NewList onAddList={handleAddList} />
                <ListList 
                  user={user} 
                  lists={lists} 
                  setLists={setLists} 
                />
            </div>
        </div>
    </div>
    );
}