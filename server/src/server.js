
To add CORS headers to your Express server, you can create a middleware function that adds the necessary headers to the response. Here's how you can modify your code to include this middleware:

javascript
Copy code
const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());

// Custom CORS middleware
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://pi-f1.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

server.use(router);

module.exports = server;
