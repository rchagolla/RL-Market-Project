import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { connect } from 'mongoose';
import { User } from "./models/User";
import { Z_ASCII } from "zlib";

const app = express();
const port = process.env.PORT || 3001;
const MongoDBURI = process.env.DATABASE_URI || '';
const saltRounds = 10;

app.use(express.static("public"));
app.use(express.json());

// DB start function
start().catch(err => console.log(err));

// creating user
app.post('/createUser', async (req, res) => {
  const params = req.body;

  console.log(params);
  // const newUser = new User({
  //   username: params.username,
  //   password: 'temp',
  //   bio: params.bio,
  //   language: params.language
  // });

  // // hash password
  // bcrypt.genSalt(saltRounds, (err, salt) => {
  //   if (err) {
  //     console.log('couldn\'t generate salt.');
  //     return;
  //   }
  //   // salt generation was successful, hash password now
  //   bcrypt.hash(params.password, salt, (err, hash) => {
  //     if (err) {
  //         console.log('could\'t hash password.');
  //         return;
  //     }
  
  //     // Hashing successful, 'hash' contains the hashed password
  //     newUser.password = hash
  //   });   
  // });

  // // check if username is taken
  // const findUser = User.find({'username': newUser.username});

  // if (findUser != null) {
  //   // someone is already using that username
  //   return false;
  // }

  // // username is unique. creating account
  // await newUser.save();
  // console.log('user created!');
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