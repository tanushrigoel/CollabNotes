import { RecoilRoot, useRecoilState } from "recoil";
import "./App.css";
import Markdown from "./components/Markdown";
import Sidebar from "./components/Sidebar";
import Signingoogle from "./components/Signingoogle";
import { Markdown1 } from "./components/Markdown1";
import { useEffect, useState } from "react";
import { currUser } from "./store/atoms/count";
import { MdLogout } from "react-icons/md";
function App() {
  const [user, setUser] = useRecoilState(currUser);
  const [userLoggedIn, setuserLoggedIn] = useState(false);

  // useEffect(() => {
  //   const guser = localStorage.getItem("user");
  //   if (guser) {
  //     setUser(guser);
  //   } // db to fetch all the related notes
  // }, []);

  return (
    <>
      <div className="flex bg-white text-primary dark:bg-gray-900 dark:text-primary-dark dark  font-inter">
        <Sidebar className="w-1/4" />
        <div className="flex-1 flex flex-col">
          <div className="flex justify-end p-4">
            {userLoggedIn ? (
              <MdLogout className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" />
            ) : (
              <Signingoogle className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" />
            )}
          </div>
          <Markdown1 className="flex-1" />
        </div>
      </div>
    </>
  );
}

export default App;

// dark:bg-gray-900 dark:text-primary-dark dark
