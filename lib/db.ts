// cnx m3a l bd fel atlas
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI; //!! .env 
console.log( "qzdqzdqzdzd",MONGODB_URI);
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ DB connection error:', error);
    throw error;
  }
};
