const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors({
  origin: "https://pif1-production.up.railway.app"
}));

server.use(router);

module.exports = server;
