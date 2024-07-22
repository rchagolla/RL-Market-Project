import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { Schema, model, connect } from 'mongoose';
import path from 'path';

const app = express();
app.use(express.static(path.join(__dirname, "../../public")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

// User document interface
interface IUser {
  username: string,
  password: string,
  bio: string,
  language: string,
  salt: number
}

// User Schema
const userSchema = new Schema<IUser>({
  username: {type: String, required: true},
  password: {type: String, required: true},
  bio: {type: String, required: true},
  language: {type: String, required: true},
  salt: {type: Number, required: true}
});

// User Model
const User = model<IUser>('User', userSchema);


// connect to DB
run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect(process.env.databaseURI ?? '');

  // test
  const user = new User({
    username: 'testuser',
    password: 'password',
    bio: 'I am a test user!',
    language: 'en',
    salt: 45
  });
  await user.save();

  console.log(user.username);
}

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('index.html');
  } catch (error) {
    next(error);
  }
});

app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Hello from the server!' });
});

app.get("*", (_req, res) => {
  res.send("hello world!");
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});