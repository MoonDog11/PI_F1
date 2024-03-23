const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');

const server = express();

server.use(morgan('dev'));
server.use(express.json());

// Configuración global de CORS
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
