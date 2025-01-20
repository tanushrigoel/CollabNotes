import { atom } from "recoil";

export const currUser = atom({
  key: "currUser",
  default: {},
});

export const currNote = atom({
  key: "currNote",
  default: 0,
});

export const notes = atom({
  key: "notes",
  default: [],
});
