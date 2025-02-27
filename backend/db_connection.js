import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI,
      {
        dbName: "MERN_E-Commerce",
      }
    );
    // console.log("Mongodb is connected successfully");
  } catch (error) {
    console.error(error);
  }
};
export default connectDb;