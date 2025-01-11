import { ChevronFirst, ChevronLast } from "lucide-react";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { user } from "../store/atoms/count";
export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const currUser = useRecoilValue(user);
  return (
    <>
      <aside className="w-64 h-screen dark:bg-gray-900">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <div className="flex items-center space-x-8 cursor-pointer">
              Create <FaPlus />
            </div>
            <button
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
              {/* <ChevronFirst /> */}
            </button>
          </div>
          {/* looping through all the notes and then presenting them */}
          <ul className="flex-1 px-3"></ul>
          <div className="border-t flex p-3 ">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />

            <div className="flex justify-between items-center w-52 ml-3">
              <div className="leading-4">
                <h4 className="font-semibold ">
                  {currUser ? currUser.name : "John Doe"}
                </h4>
                <span className="text-xs text-gray-600">
                  {currUser ? currUser.email : "johndoe@gmail.com"}
                </span>
              </div>
              <BsThreeDotsVertical />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
