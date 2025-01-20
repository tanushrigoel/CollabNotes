import { doc, getDoc, setDoc } from "firebase/firestore";
import { notes } from "../store/atoms/count";
import { useRecoilState } from "recoil";

export default async function fetchNotes(uid) {
  const userDocRef = doc(db, "users", uid);
  const [notecoll, setnotecoll] = useRecoilState(notes);

  // Check if document exists
  const snapshot = await getDoc(userDocRef);

  if (snapshot.exists()) {
    setnotecoll(snapshot.data().notes);
    console.log(snapshot.data().notes);

    return; // Return existing notes
  } else {
    // Initialize empty notes for new user
    await setDoc(userDocRef, {
      notes: [
        {
          title: "Notes1",
          content: "# Hello there",
        },
      ],
    });
    return [];
  }
}
