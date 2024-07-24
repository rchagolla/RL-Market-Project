import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static("public"));

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

// creating user
app.post('/createUser', (_req, res) => {
  
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});