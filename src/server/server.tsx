import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { connect } from 'mongoose';
import { User } from "./models/User";
import session from 'express-session';

declare module 'express-session' {
  interface SesData {
    userId: number | null;
    username: string | null;
  }
}

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

// Login user
app.post('/login', async (req, res) => {
  const params = req.body;

  const findUser = await User.findOne({'username' : params.username});
  // username is not in use
  if (!findUser?.$isEmpty) {
    res.json({success: false});
    return;
  }

  // check passwords
  bcrypt.compare(params.password, findUser.password, (err, result) => {
    // passwords match
    if (result) {
      res.json({success: true});
      return;
    } else {
      // passwords don't match
      res.json({success: false});
    }
  });
});

// creating user
app.post('/createUser', async (req, res) => {
  const params = req.body;

  // // check if username is taken
  const findUser = await User.findOne({'username': params.username});

  if (findUser?.$isEmpty) {
    // someone is already using that username return false for hook.
    console.log('username taken.');
    res.json({success: false});
    return;
  }

  // hash password
  bcrypt.genSalt(saltRounds, async (err, salt) => {
    if (err) {
      console.log('couldn\'t generate salt.');
      return;
    }
    // salt generation was successful, hash password now
    bcrypt.hash(params.password, salt, async (err, hash) => {
      if (err) {
          console.log('could\'t hash password.');
          return;
      }
  
      // Hashing successful, 'hash' contains the hashed password
      // create user
      const newUser = new User({
        username: params.username,
        password: hash,
        bio: params.bio,
        language: params.language
      });

      // creating account and returning true for hook.
      await newUser.save();
      console.log('user created!');
    });
  });

  res.json({success: true});
});


app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Hello from the server!' });
});

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