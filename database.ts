import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/crud';
async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB using Mongoose!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
export default connectDB;
