import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../utils/firebaseapp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { currUser, notes } from "../store/atoms/count";
import { useRecoilState } from "recoil";
import { doc, setDoc, getDocs, getDoc, collection } from "firebase/firestore";

function Signingoogle() {
  const [cuser, setUser] = useRecoilState(currUser);
  const [notesc, setnotesc] = useRecoilState(notes);

  const googlelogin = async function () {
    const provider = new GoogleAuthProvider();

    try {
      const res = await signInWithPopup(auth, provider);
      if (res.user) {
        const user = res.user;

        // Update Recoil state
        setUser({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        });
        const userRef = doc(db, "users", user.uid); // Reference to user's document
        console.log(userRef);

        const userSnap = await getDoc(userRef);
        console.log(userSnap);

        if (!userSnap.exists()) {
          console.log(userSnap.exists());
          try {
            await setDoc(userRef, {
              name: user.displayName,
              email: user.email,
              uid: user.uid,
              createdAt: new Date().toISOString(),
            });

            const notesRef = collection(userRef, "notes"); // Reference to the notes collection

            const initialNoteRef = doc(notesRef); // Creates a document with an auto-generated ID
            await setDoc(initialNoteRef, {
              title: "Welcome there",
              content: "Start writing your first move",
            });

            console.log("User added to Firestore with initial note.");
          } catch (error) {
            console.error("Error initializing notes:", error);
          }
        } else {
          console.log("User already exists in Firestore.");
          // Fetch existing notes if any
          // const notes = [];
          // const notesRef = doc(collection(userRef, "notes"));

          try {
            const notesRef = collection(db, "users", user.uid, "notes");

            // Fetch all documents in the subcollection
            const querySnapshot = await getDocs(notesRef);

            const notes = [];
            querySnapshot.forEach((doc) => {
              notes.push({ id: doc.id, ...doc.data() }); // Extract each note's data
            });

            setnotesc(notes); // Update the notes state
            console.log("All notes:", notes);
          } catch (error) {
            console.error("Error getting notes:", error);
          }
        }

        // Show success toast
        toast.success(`User ${user.displayName} logged in successfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error during Google login:", error);

      // Show error toast
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  //fetch from db

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div
        onClick={googlelogin}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer shadow-lg"
      >
        Login with Google
      </div>
    </div>
  );
}

export default Signingoogle;
