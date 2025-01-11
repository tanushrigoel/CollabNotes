import { RecoilRoot } from "recoil";
import "./App.css";
import Markdown from "./components/Markdown";
import Sidebar from "./components/Sidebar";
import Signingoogle from "./components/Signingoogle";
import { Comp } from "./components/test";

function App() {
  return (
    <>
      <RecoilRoot>
        <div class="flex bg-white text-primary dark:bg-gray-900 dark:text-primary-dark dark font-inter">
          {/* <Comp/> */}
          <Sidebar />
          {/* <div> */}
          <Signingoogle />
          <Markdown />
          {/* </div> */}
        </div>
      </RecoilRoot>
    </>
  );
}

export default App;
