import {Schema, model} from "mongoose";

// User Interface
interface IUser {
  username: string;
  password: string;
  bio: string;
  language: string;
};

// User Schema
const userSchema = new Schema<IUser>({
  username: {type: String, required: true},
  password: {type: String, required: true},
  bio: {type: String, required: true},
  language: {type: String, required: true}
});

// User Model
const User = model<IUser>('User', userSchema);

export { User };