import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { currUser, currNote, notes } from "../store/atoms/count";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Listcomp } from "./Listcomp";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const cuser = useRecoilValue(currUser);
  const [anotes, setanotes] = useRecoilState(notes); // list of notes
  const [cind, setcind] = useRecoilState(currNote); // index of note

  const createNote = () => {
    const newNote = {
      title: `Notes${anotes.length + 1}`,
      content: `# Hello there${anotes.length}`,
    };
    setanotes([...anotes, newNote]);
    // Optionally, update local storage if needed
    localStorage.setItem("notes", JSON.stringify([...anotes, newNote]));
  };

  return (
    <aside className="w-64 h-screen dark:bg-gray-900">
      <nav className="h-full flex flex-col dark:bg-gray-900 border-r shadow-sm outline-none border-none text-white">
        <div className="p-4 flex justify-center">
          <div
            className="flex items-center space-x-2 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
            onClick={() => {
              createNote();
              console.log(anotes);
            }}
          >
            <span>Create</span> <FaPlus className=""/>
          </div>
        </div>
        <ul className="flex-1 px-3">
          {anotes.map((note, index) => (
            <li
              key={index}
              className="cursor-pointer hover:bg-gray-700 p-2 rounded"
              onClick={() => setcind(index)}
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
            <BsThreeDotsVertical />
          </div>
        </div>
      </nav>
    </aside>
  );
}
