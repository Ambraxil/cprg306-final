import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query
} from "firebase/firestore";

// READ
export async function getTasks(userId) {
  const ref = collection(db, "users", userId, "tasks");
  const q = query(ref);
  const snap = await getDocs(q);

  const tasks = [];
  snap.forEach((docSnapshot) => {
    tasks.push({ id: docSnapshot.id, ...docSnapshot.data() });
  });

  return tasks;
}

// CREATE
export async function addTask(userId, task) {
  const ref = collection(db, "users", userId, "tasks");
  const docRef = await addDoc(ref, task);
  return docRef.id;
}

// UPDATE
export async function updateTask(userId, taskId, updates) {
  const ref = doc(db, "users", userId, "tasks", taskId);
  await updateDoc(ref, updates);
}

// DELETE
export async function deleteTask(userId, taskId) {
  const ref = doc(db, "users", userId, "tasks", taskId);
  await deleteDoc(ref);
}
