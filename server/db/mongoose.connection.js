import mongoose from "mongoose";

async function connectDB() {
    try {
        const data = await mongoose.connect(process.env.DATABASE_URL);
    } catch (error) {
        console.log(error);
    }
  
}

export default connectDB;