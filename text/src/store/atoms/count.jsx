import { atom } from "recoil";

export const user = atom({
  key: "user",
  default: {},
});

export const note = atom({
  key: "note",
  default: "",
});

export const notes = atom({
  key: "notes",
  default: [note],
});
