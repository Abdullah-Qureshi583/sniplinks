import mongoose from "mongoose";

const connectDB = async () => {
  console.log("request come to connect db")
  if (mongoose.connection.readyState >= 1) {
    console.log("database is already connected");
    return; // Already connected
  }
  try {
    console.log("before connect to mongoose");
    const a = await mongoose.connect(process.env.MONGO_URI); // Just pass the URI
    console.log("MongoDB connected", a);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
