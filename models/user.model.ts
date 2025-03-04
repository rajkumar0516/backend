import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: 'table' }
);

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const UserSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   { collection: 'table' }
// );

// const User = mongoose.model('User', UserSchema);

// module.exports = {
//   User,
//   IUser: {
//     name: String,
//     email: String,
//   },
// };
