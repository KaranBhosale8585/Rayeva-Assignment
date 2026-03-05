import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI as string;

if (!MONGODB_URL) throw new Error("MongoDB_URI is missing!");

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB connection falied:", error);
    throw error;
  }
}
