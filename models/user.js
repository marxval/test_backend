import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  date: Date,
  punchIn: Date,
  punchOut: Date,
});

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  records: [recordSchema],
});

export default mongoose.model("User", userSchema);
