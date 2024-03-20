const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());

// Configurar CORS
server.use(cors({
  origin: "https://pi-f1.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware para manejar opciones preflight
server.options('*', (req, res) => {
  res.sendStatus(200);
});

server.use(router);

module.exports = server;
