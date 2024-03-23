const express = require('express');
const bodyParser = require('body-parser'); // Middleware de análisis de cuerpo de solicitud
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');

const server = express();

server.use(morgan('dev'));

// Middleware de análisis de cuerpo de solicitud para una ruta específica
const jsonParserMiddleware = bodyParser.json();
server.use('/drivers', jsonParserMiddleware);

// Middleware CORS global
server.use(cors({
  origin: 'https://pi-f1.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware de manejo de preflight options global
server.options('*', cors());

// Utiliza tus rutas
server.use(router);

module.exports = server;
