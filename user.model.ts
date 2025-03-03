import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
}
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { collection: 'table' }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
export { IUser };
