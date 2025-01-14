import mongoose, { Schema } from "mongoose";
const notesSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: Schema.Types.ObjectId,
      default: "",
    },
  },
  { timestamps: true }
);

export const Note = new mongoose.model("Note", notesSchema);
