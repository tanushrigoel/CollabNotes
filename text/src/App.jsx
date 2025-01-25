import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Signingoogle from "./components/Signingoogle";
import { Markdown1 } from "./components/Markdown1";
import { useEffect, useState } from "react";
import { currUser } from "./store/atoms/count";
import { MdLogout } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import {ArrowDownToLine, ArrowDownToLineIcon} from "lucide-react"
function App() {
  const curruser = useRecoilValue(currUser);
  return (
    <>
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
      <div className="flex bg-white text-primary dark:bg-gray-900 dark:text-primary-dark dark  font-inter">
        <Sidebar className="w-1/4" />
        <div className="flex-1 flex flex-col">
          <div className="flex justify-end p-4">
            {/* {curruser?.uid ? ( */}
              {/* <ArrowDownToLineIcon className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"/> */}
              {/* <MdLogout className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" /> */}
            {/* ) : ( */}
              <Signingoogle className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" />
            {/* )} */}
          </div>
          <Markdown1 className="flex-1" />
        </div>
      </div>
    </>
  );
}

export default App;

// dark:bg-gray-900 dark:text-primary-dark dark
