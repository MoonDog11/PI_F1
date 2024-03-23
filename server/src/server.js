const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');

const server = express();

server.use(morgan('dev'));
server.use(express.json());

// Configuración global de CORS
server.use(cors({
  origin: 'https://pi-f1.vercel.app', // Origen permitido
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));

// Utiliza tus rutas
server.use(router);

module.exports = server;
