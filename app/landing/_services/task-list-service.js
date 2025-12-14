import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
} from "firebase/firestore";

// READ tasks for a user
export async function getTasks(userId, listId) {
  try {
    const ref = collection(db, "users", userId, "lists", listId, "tasks");
    const q = query(ref);
    const snap = await getDocs(q);

    const tasks = [];
    snap.forEach((docSnapshot) => {
      tasks.push({ id: docSnapshot.id, ...docSnapshot.data() }); // Firestore doc ID
    });

    return tasks;
  } catch (error) {
    console.error("Failed to get tasks:", error);
    return [];
  }
}

// CREATE new task
export async function addTask(userId, listId, task) {
  try {
    const ref = collection(db, "users", userId, "lists", listId, "tasks");
    const docRef = await addDoc(ref, task);
    return docRef.id; // Firestore document ID
  } catch (error) {
    console.error("Failed to add task:", error);
    return null;
  }
}

// UPDATE task fields (title, details, completed, times, etc.)
export async function updateTask(userId, listId, taskId, updates) {
  try {
    const ref = doc(db, "users", userId, "lists", listId, "tasks", taskId);
    await updateDoc(ref, updates);
  } catch (error) {
    console.error(`Failed to update task ${taskId}:`, error);
  }
}

// DELETE task
export async function deleteTask(userId, listId, taskId) {
  try {
    const ref = doc(db, "users", userId, "lists", listId, "tasks", taskId);
    await deleteDoc(ref);
  } catch (error) {
    console.error(`Failed to delete task ${taskId}:`, error);
  }
}
