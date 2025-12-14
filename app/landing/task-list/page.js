"use client";

import { useState, useEffect } from "react";
import TaskList from "./task-list";
import NewTask from "./new-task";
import TaskDetailsEditor from "./task-details-editor";
import { addTask, getTasks, updateTask } from "../_services/task-list-service";
import { useUserAuth } from "../_utils/auth-context";

export default function Page() {
  const { user } = useUserAuth();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const loadTasks = async () => {
    if (!user) return;
    const data = await getTasks(user.uid, listId);
    setTasks(data); // Firestore IDs are used here
  };

  useEffect(() => {
    if (user) loadTasks();
  }, [user]);

  const handleAddTask = async (task) => {
    if (!user) return;
    const docId = await addTask(user.uid, listId, task); // Firestore document ID
    setTasks((prev) => [...prev, { ...task, id: docId }]);
  };

  const handleTaskSelect = (task) => setSelectedTask(task);

  const handleToggleComplete = async (taskId, newValue) => {
    if (!user) return;
    try {
      await updateTask(user.uid, listId, taskId, { completed: newValue });
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, completed: newValue } : task))
      );
      if (selectedTask?.id === taskId)
        setSelectedTask((prev) => ({ ...prev, completed: newValue }));
    } catch (error) {
      console.error("Failed to update task:", error);
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
          Please sign in to access the task list features.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-300 p-6 text-blue-900">
      <header className="w-full text-left pb-4 mb-6 border-b-4 border-blue-900">
        <h1 className="text-3xl font-bold">Swift List</h1>
      </header>

      <h1 className="text-2xl font-bold text-center mb-6">📝 Task Manager</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <NewTask onAddTask={handleAddTask} />
          <TaskList
            user={user}
            tasks={tasks}
            setTasks={setTasks}
            onTaskSelect={handleTaskSelect}
            onToggleComplete={handleToggleComplete}
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

              <TaskDetailsEditor
                task={selectedTask}
                user={user}
                onUpdate={(updatedTask) => setSelectedTask(updatedTask)}
                onUpdateList={(updatedTask) =>
                  setTasks((prev) =>
                    prev.map((task) =>
                      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
                    )
                  )
                }
              />
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
