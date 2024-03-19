const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());

server.use(cors({
  origin: "https://pi-f1.vercel.app"
}));

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://pi-f1.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

server.use(router);

module.exports = server;
