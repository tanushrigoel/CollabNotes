import { atom } from "recoil";

export const currUser = atom({
  key: "currUser",
  default: {},
});

export const currNoteId = atom({
  key: "currNoteId",
  default:""
});

export const currNote = atom({
  key: "currNote",
  default: "",
});

export const notes = atom({
  key: "notes",
  default: [],
});
