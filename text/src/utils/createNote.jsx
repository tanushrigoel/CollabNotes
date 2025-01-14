import React from "react";
import { Note } from "../models/notes.model.js";
import { currUser } from "../store/atoms/count.jsx";
import { useRecoilValue } from "recoil";
async function createNote() {
  const user = useRecoilValue(currUser);
  await Note.create({
    userId: user.googleId,
    content: "",
  });
//   return <div>createNote</div>;
}

export default createNote;
