import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MONGODB CONNECTED!! DB HOST: ${connnectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGO DB CONNECTION ERROR ", error);
    process.exit(1);
  }
};

export default connectDB;
