import { collection, addDoc as addDocRaw } from "firebase/firestore";
import { db } from '@/firebase/config'
// Add a new document with a generated id.
const addDoc = (col, data) => {
  await addDocRaw(collection(db, col), data)
}

console.log("addDoc success, col:", col);

export default addDoc