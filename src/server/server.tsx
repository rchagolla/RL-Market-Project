import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { connect } from 'mongoose';
import { User } from "./models/User";
import session, { SessionData} from 'express-session';
import { rpcHandler } from 'typed-rpc/express';

const app = express();
const port = process.env.PORT || 3001;
const MongoDBURI = process.env.DATABASE_URI || '';
const saltRounds = 10;

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
        <title>CS Slots</title>
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
      console.log('invalid username!');
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
    const findUser = await User.findOne({'username': username});

    if (findUser?.$isEmpty) {
      // someone is already using that username return false for hook.
      console.log('username taken.');
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

  getSessionInfo() {
    const sessionInfo = {
      userId: this.session.userId,
    };

    return sessionInfo;
  }

  async getUser(id: number) {
    const user = await User.findById(id);

    return user;
  }
}

// starting up DB
// TODO: MAKE DB CONNECT THEN START SERVER
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