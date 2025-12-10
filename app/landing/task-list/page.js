"use client";

import { useState, useEffect } from "react";
import TaskList from "./task-list";
import NewTask from "./new-task";
import {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../_services/task-list-service";
import { useUserAuth } from "../_utils/auth-context";

export default function Page() {
  const { user } = useUserAuth();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const loadTasks = async () => {
    if (!user) return;
    const data = await getTasks(user.uid);
    setTasks(data);
  };

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const handleAddTask = async (task) => {
    if (!user) return;

    const id = await addTask(user.uid, task);
    const taskWithId = { ...task, id };

    setTasks((prev) => [...prev, taskWithId]);
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handleToggleComplete = async (taskId, newValue) => {
    if (!user) return;

    await updateTask(user.uid, taskId, { completed: newValue });

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: newValue } : task
      )
    );

    if (selectedTask?.id === taskId) {
      setSelectedTask((prev) => ({ ...prev, completed: newValue }));
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!user) return;

    await deleteTask(user.uid, taskId);

    setTasks((prev) => prev.filter((task) => task.id !== taskId));

    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4">Secured Page</h1>
        <p className="text-lg text-center">
          Please sign in to access the task list features.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📝 Task Manager</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <NewTask onAddTask={handleAddTask} />

          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            onTaskSelect={handleTaskSelect}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
          />
        </div>

        <div className="flex-1">
          {selectedTask ? (
            <div className="p-4 bg-white rounded shadow text-black">
              <h2 className="text-xl font-bold mb-2">{selectedTask.title}</h2>
              <p className="mb-1">
                <strong>Start:</strong> {selectedTask.startTime || "Not set"}
              </p>
              <p className="mb-1">
                <strong>End:</strong> {selectedTask.endTime || "Not set"}
              </p>
              <p className="mb-1">
                <strong>Status:</strong>{" "}
                {selectedTask.completed ? "Completed" : "Pending"}
              </p>

              <button
                onClick={() => handleDeleteTask(selectedTask.id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
              >
                Delete Task
              </button>
            </div>
          ) : (
            <p className="text-gray-400 text-center mt-20">
              Select a task to view details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
