import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebaseapp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import btn from "./images.png";
import { currUser } from "../store/atoms/count";
import { useRecoilState } from "recoil";

function Signingoogle() {
  const [cuser, setUser] = useRecoilState(currUser);

  const googlelogin = function () {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (res) => {
      console.log(res);
      if (res.user) {
        console.log("login sucessful");
        // console.log(res.user.displayName);
        console.log(res.user.uid);
        setUser({
          name: res.user.displayName,
          email: res.user.email,
          googleId: res.user.uid,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({ uid: res.user.uid, email: res.user.email })
        );

        toast.success(`User ${res.user.displayName} logged in successfully`, {
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
    });
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
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
        <a href=""></a>
        Download
      </div>
    </div>
  );
}

export default Signingoogle;
