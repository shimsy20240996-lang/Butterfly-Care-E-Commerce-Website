import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<boolean> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/butterfly_care';
    
    console.log(`[Database] Connecting to MongoDB...`);
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 4000,
    });
    
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error: any) {
    console.warn(`[Database] Notice: MongoDB connection failed (${error.message}).`);
    console.warn(`[Database] Note: Ensure MongoDB is running locally or provide a valid MONGODB_URI in backend/.env for Atlas.`);
    return false;
  }
};
