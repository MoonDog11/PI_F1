const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors({
  origin: "https://pi-f1.vercel.app/" // Reemplaza esto con el dominio real de tu aplicación en Railway
}));

server.use(router);

module.exports = server;
