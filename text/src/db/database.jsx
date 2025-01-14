import "mongoose";
import mongoose from "mongoose";

async function connectDb() {
  try {
    const str = await mongoose.connect(
      "mongodb+srv://tanushri:tanushri@cluster0.ubo0k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(str);
  } catch (err) {
    console.log("Error connecting to database", err);
  }
}
