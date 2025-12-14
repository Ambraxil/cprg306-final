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

// READ lists for a user
export async function getLists(userId) {
  try {
    const ref = collection(db, "users", userId, "lists");
    const q = query(ref);
    const snap = await getDocs(q);
    const lists = [];
    snap.forEach((docSnapshot) => {
      lists.push({ id: docSnapshot.id, ...docSnapshot.data() }); // Firestore doc ID
    });

    return lists;
  } catch (error) {
    console.error("Failed to get lists:", error);
    return [];
  }
}

// CREATE new list
export async function addList(userId, listId) {
  try {
    const ref = collection(db, "users", userId, "lists");
    const docRef = await addDoc(ref, listId);
    return docRef.id; // Firestore document ID
  } catch (error) {
    console.error("Failed to add list:", error);
    return null;
  }
}

// DELETE list
export async function deleteList(userId, listId) {
    try {
        const ref = doc(db, "users", userId, "lists", listId);
        await deleteDoc(ref);
    } catch (error) {
        console.error(`Failed to delete list ${listId}:`, error);
    }
}

