const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');

const server = express();

server.use(morgan('dev'));
server.use(express.json());

// Configure CORS
server.use(cors({
  origin: 'https://pi-f1.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'] // Corrected property name
}));

// Middleware to handle preflight options
server.options('*', cors());

// Use your routes
server.use(router);

module.exports = server;
