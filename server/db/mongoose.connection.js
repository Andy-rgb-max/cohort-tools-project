import mongoose from "mongoose";

function connectDB() {
  return mongoose.connect(process.env.DATABASE_URL);
}

export default connectDB;