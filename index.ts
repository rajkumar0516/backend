import connectDB from './database';
import User from './user.model';
import mongoose from 'mongoose';
async function main() {
  await connectDB();
  try {
    const newUser = new User({
      name: 'Test User',
      email: 'testuser@gmail.com',
    });
    await newUser.save();
    console.log('User inserted successfully:', newUser);
  } catch (error) {
    console.error('Error inserting user:', error);
  } finally {
    mongoose.connection.close();
  }
}

main();
