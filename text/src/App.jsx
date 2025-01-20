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
  const [currUser, setCurrUser] = useRecoilState(currUser);
  const [userLoggedIn, setuserLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrUser(user);
    }
  }, []);

  return (
    <>
      <RecoilRoot>
        <div className="flex bg-white text-primary dark:bg-gray-900 dark:text-primary-dark dark  font-inter">
          <Sidebar className="w-1/4" />
          <div className="flex-1 flex flex-col">
            <div className="flex justify-end p-4">
              {userLoggedIn ? (
                <MdLogout className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"/>
              ) : (
                <Signingoogle className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" />
              )}
            </div>
            <Markdown1 className="flex-1" />
          </div>
        </div>
      </RecoilRoot>
    </>
  );
}

export default App;

// dark:bg-gray-900 dark:text-primary-dark dark
