import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { connect, ObjectId } from 'mongoose';
import { User } from "./models/User";
import session, { SessionData} from 'express-session';
import { rpcHandler } from 'typed-rpc/express';
import { Inventory } from "./models/Inventory";

const app = express();
const port = process.env.PORT || 3001;
const MongoDBURI = process.env.DATABASE_URI || '';
const saltRounds = 10;

// Password/Username regex
const symbols = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const numberRegex = /\d/;
const letterRegex = /[a-zA-Z]+/;
const spaceRegex = /\s/;

app.use(express.static("public"));
app.use(express.json());
app.use(
  session({ secret: "sessionKey", saveUninitialized: false, resave: false })
);

// DB start function
start().catch(err => console.log(err));

app.post('/rpc', rpcHandler((req) => new APIService(req.session as SessionData)));

app.get("*", (_req, res) => {
  const html = ReactDOMServer.renderToString(
    <html lang="en" data-bs-theme="dark">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RL Market</title>
        <link rel="icon" href="/img/rlmarket(2).png"></link>
      </head>
      <body>
        <div id="root"></div>
        <script src="js/client.js" />
      </body>
    </html>
  );

  res.send(html);
});

class APIService {
  constructor(private session:SessionData){}

  // Login user
  async authLogin(username:string, password:string) {
    const user = await User.findOne({'username' : username});
    // username is not in use
    if (!user?.$isEmpty) {
      return false;
    }

    // check passwords
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (isValidPassword) {
      this.session.userId = user.id;
      return true;
    } else {
      return false;
    }
  }

  // Logout
  async authLogout(){
    this.session.userId = null;
    return true;
  }

  // creating user
  async createUser(username: string, password: string, bio: string, language: string) {
    // // check if username is taken
    // const findUser = await User.findOne({'username': username});

    // if (findUser?.$isEmpty) {
    //   // someone is already using that username return false for hook.
    //   return false;
    // }

    const isUsernameTaken = await this.getUserByUsername(username);
    if (isUsernameTaken) {
      // someone is already using that username return false for hook.
      return false;
    }

    // hash password
    bcrypt.genSalt(saltRounds, async (err, salt) => {
      if (err) {
        console.log('couldn\'t generate salt.');
        return false;
      }
      // salt generation was successful, hash password now
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
            console.log('could\'t hash password.');
            return false;
        }
    
        // Hashing successful, 'hash' contains the hashed password
        // create user
        const newUser = new User({
          username: username,
          password: hash,
          bio: bio,
          language: language
        });

        // creating account and returning true for hook.
        await newUser.save();
        console.log('user created!');
      });
    });

    return true;
  }

  async modifyUser(username: string, bio: string, language: string) {
    const currUser = await this.getCurrentUser();
    if (currUser !== null) {
      // new username taken.
      const isUsernameTaken = await this.getUserByUsername(username);
      if (isUsernameTaken) {
        return false;
      }
      currUser.username = username;
      currUser.bio = bio;
      currUser.language = language;

      await currUser.save();
      return true;
    }
    return false;
  }

  async getCurrentUser() {
    const id = this.session.userId;
    return id ? await this.getUser(id) : null;
  }

  async getUser(id: number) {
    const user = await User.findById(id);

    return user;
  }

  async getUserByUsername(username: string) {
    // check if username is taken
    const findUser = await User.findOne({'username': username});

    if (findUser?.$isEmpty) {
      // someone is already using that username.
      return true;
    }

    return false;
  }

  isUsernameInvalid(username: string) {
    // checks if there is symbols in username
    if (username === '' || symbols.test(username)){
      return true;
    }

    return false;
  }

  isPasswordInvalid(password: string) {
    // checks if password is 8-20 in length
    // setUsernameError(false);
    if (password === '' || password.length < 8 || password.length > 20) {
      // setPasswordError(true);
      return true;
    }

    // checks if password has a number, letter and symbol and any whitespace
    if (!numberRegex.test(password) || !letterRegex.test(password) || !symbols.test(password) || spaceRegex.test(password)) {
      // setPasswordError(true);
      return true;
    }

    // password is in right format
    return false;
  }

  sellItem(itemId: string) {
    console.log(`userId: `, this.session.userId);
    console.log("itemId: ", itemId);

    return true;
  }
}

// starting up DB
async function start() {
  try{
    await connect(MongoDBURI);
  } catch(err) {
    console.log('Couldn\'t connect to DB.');
  }

  console.log('Connected to DB!');
}

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});


declare module 'express-session' {
  interface SessionData {
    userId: number | null;
  }
}

export type { APIService };