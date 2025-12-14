"use client";

import { useState, useEffect } from "react";
import ListList from "./list-list";
import NewList from "./new-list";
import { addList, getLists} from "../_services/list-list-service";
import { useUserAuth } from "../_utils/auth-context";
import TaskList from "../task-list/task-list";
import NewTask from "../task-list/new-task";
import TaskDetailsEditor from "../task-list/task-details-editor";
import { addTask, getTasks, updateTask, deleteTask } from "../_services/task-list-service";

export default function ListPage() {
  const { user } = useUserAuth();
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

    const loadLists = async () => {
    if (!user) return;
    const data = await getLists(user.uid);
    setLists(data); // Firestore IDs are used here
    };

    useEffect(() => {
    if (user) loadLists();
    if (selectedList) loadTasks();
    }, [user, selectedList]);

    const handleAddList = async (lists) => {
    if (!user) return;
    const docId = await addList(user.uid, lists); // Firestore document ID
    setLists((prev) => [...prev, { ...lists, id: docId }]);
    }

  const handleSelectList = (id) => {
    setSelectedList(id);
    setSelectedTask(null);
  };
  const loadTasks = async () => {
    if (!user) return;
    const data = await getTasks(user.uid, selectedList);
    setTasks(data); // Firestore IDs are used here
  };

  const handleAddTask = async (task) => {
    if (!user) return;
    const docId = await addTask(user.uid, selectedList, task); // Firestore document ID
    setTasks((prev) => [...prev, { ...task, id: docId }]);
  };

  const handleTaskSelect = (task) => setSelectedTask(task);

  const handleToggleComplete = async (taskId, newValue) => {
    if (!user) return;
    try {
      await updateTask(user.uid, selectedList, taskId, { completed: newValue });
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, completed: newValue } : task))
      );
      if (selectedTask?.id === taskId)
        setSelectedTask((prev) => ({ ...prev, completed: newValue }));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!user) return;
    if (taskId == selectedTask?.id) {
      setSelectedTask(null);
    }
    try {
      await deleteTask(user.uid, selectedList, taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

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

  if (selectedList == null) {
    return (
    <div className="min-h-screen bg-gray-100 text-blue-900 p-6">
      <header className="w-full text-left pb-4 mb-6 border-b-4 border-blue-900">
        <h1 className="text-3xl font-bold">Swift List</h1>
        </header>
        <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
                <NewList onAddList={handleAddList} />
                <ListList 
                  user={user} 
                  lists={lists} 
                  setLists={setLists} 
                  onSelectList={handleSelectList}
                />
            </div>
        </div>
    </div>
    );
  }

if (selectedList != null) {
 return (
    <div className="min-h-screen bg-gray-300 p-6 text-blue-900">
      <header className="w-full text-left pb-4 mb-6 border-b-4 border-blue-900">
        <h1 className="text-3xl font-bold">Swift List</h1>
      </header>

      <h1 className="text-2xl font-bold text-center mb-6">📝 Task Manager</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div>
          <button
            type="button"
            onClick={() => setSelectedList(null)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:cursor-pointer hover:bg-blue-700"
          >
            ← Back to Lists
          </button>
        </div>
        <div className="flex-1">
          <NewTask onAddTask={handleAddTask} />
          <TaskList
            user={user}
            tasks={tasks}
            setTasks={setTasks}
            onTaskSelect={handleTaskSelect}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
          />
        </div>

        <div className="flex-1">
          {selectedTask ? (
            <div className="p-4 bg-white rounded-xl border-2 border-blue-900 shadow text-blue-900">
              <h2 className="text-xl font-bold mb-2">{selectedTask.title}</h2>
              <p className="mb-1">
                <strong>Start:</strong> {selectedTask.startTime || "Not set"}
              </p>
              <p className="mb-1">
                <strong>End:</strong> {selectedTask.endTime || "Not set"}
              </p>
              <p className="mb-1">
                <strong>Status:</strong> {selectedTask.completed ? "Completed" : "Pending"}
              </p>
              {selectedTask &&
              <TaskDetailsEditor
                task={selectedTask}
                list={selectedList}
                user={user}
                onUpdate={(updatedTask) => setSelectedTask(updatedTask)}
                onUpdateList={(updatedTask) =>
                  setTasks((prev) =>
                    prev.map((task) =>
                      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
                    )
                  )
                }
              />}
            </div>
          ) : (
            <p className="text-blue-700 text-center mt-20">
              Select a task to view details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
}