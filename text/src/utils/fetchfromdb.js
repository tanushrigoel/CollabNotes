import { doc, getDoc, setDoc } from "firebase/firestore";
import { currUser, notes } from "../store/atoms/count";
import { useRecoilState } from "recoil";

export default async function fetchNotes() {
  const [curr, setCurr] = useRecoilState(currUser);
  if(!curr) return "User does not exist"
  const userDocRef = doc(db, "users", curr.uid);
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
