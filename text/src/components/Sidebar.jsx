import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { currUser, currNote, notes, currNoteId } from "../store/atoms/count";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebaseapp";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

export default function Sidebar() {
  // const [expanded, setExpanded] = useState(true);
  const [cuser, setcuser] = useRecoilState(currUser); // Current user information
  const [anotes, setanotes] = useRecoilState(notes); // List of notes
  const [currnote, setCurrnote] = useRecoilState(currNote);
  const [currId, setcurrId] = useRecoilState(currNoteId);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // console.log("hi");

  // Function to add a new note
  const createNote = async () => {
    const newNote = {
      title: `Notes${anotes.length + 1}`,
      content: `# Hello there${anotes.length}`,
    };
    if (cuser?.uid) {
      try {
        const userDocRef = collection(db, "users", cuser.uid, "notes");
        // const initiId = collection(userDocRef, "notes").id; // Reference to the user's document
        const docRef = await addDoc(userDocRef, newNote);
        console.log("Note added to Firestore!");
        localStorage.setItem(`note-${docRef.id}`, newNote);
        setanotes((prevNotes) => [...prevNotes, { id: docRef.id, ...newNote }]);
      } catch (error) {
        console.error("Error saving note to Firestore:", error);
      }
    } else {
      console.warn("No user is logged in. Skipping Firestore update.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setcuser({});
      setanotes([]);
      setCurrnote("");
      toast.success(`User  logged out successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setDropdownVisible(false);
      console.log("User logged out successfully");
      // Redirect to login page or reset user-related state
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <aside className="w-64 h-screen dark:bg-gray-900">
      <nav className="h-full flex flex-col dark:bg-gray-900 border-r shadow-sm outline-none border-none text-white">
        <div className="p-4 flex justify-center">
          <div
            className="flex items-center space-x-2 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
            onClick={() => {
              createNote();
            }}
          >
            <span>Create</span> <FaPlus className="" />
          </div>
        </div>
        <ul className="flex-1 px-3">
          {anotes?.map((note, index) => (
            <li
              key={note.id}
              className="cursor-pointer hover:bg-gray-700 p-2 rounded"
              onClick={() => {
                setCurrnote(note.content);
                setcurrId(note.id);
              }}
            >
              {note.title}
            </li>
          ))}
        </ul>
        <div className="border-t flex p-3 ">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div className="flex justify-between items-center w-52 ml-3">
            <div className="leading-4">
              <h4 className="font-semibold ">
                {cuser ? cuser.name : "John Doe"}
              </h4>
              <span className="text-xs text-gray-600">
                {cuser ? cuser.email : "johndoe@gmail.com"}
              </span>
            </div>
            <div className="relative">
              <BsThreeDotsVertical
                className="cursor-pointer"
                onClick={() => setDropdownVisible((prev) => !prev)}
              />
              {dropdownVisible && cuser && (
                <div className="absolute right-0 bottom-8 mt-3 w-35 bg-gray-800 rounded-md shadow-lg text-white text-center px-6">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
