import { RecoilRoot } from "recoil";
import "./App.css";
import Markdown from "./components/Markdown";
import Sidebar from "./components/Sidebar";
import Signingoogle from "./components/Signingoogle";

function App() {
  return (
    <>
      <RecoilRoot>
        <div className="flex bg-white text-primary dark:bg-gray-900 dark:text-primary-dark dark font-inter">
          <Sidebar className="w-1/4" />
          <div className="flex-1 flex flex-col">
            <div className="flex justify-end p-4">
              <Signingoogle className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" />
            </div>
            <Markdown className="flex-1" />
          </div>
        </div>
      </RecoilRoot>
    </>
  );
}

export default App;
