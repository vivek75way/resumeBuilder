import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

export const initDB = async (): Promise<boolean> => {
  try {
    const mongodbUri = process.env.MONGODB_URI;
    
    if (!mongodbUri) {
      throw new Error("MongoDB URI not found! Check your .env file.");
    }

    mongoose.set("strictQuery", false);

    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log("DB Connected!");
    return true;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};
