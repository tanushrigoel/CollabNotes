import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebaseapp";

try {
  const docRef = await addDoc(collection(db, "users"), {
    
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
