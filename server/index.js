const express = require('express');
const server = require('./src/server');
const { conn } = require('./src/db.js');
const { createDriverController, saveDriversToLocalhost, getAllDriversController, getDriverByNameController, getDriverByIdController, searchDriversByTeamController, getAllTeamsController, fetchDataFromLocalhost, saveDriversToLocalhost } = require("./src/Controllers/driverController.js");

require('dotenv').config();

const { PORT } = process.env;
const app = express();

// Inicia el servidor proporcionado por Railway
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
saveDriversToLocalhost();
});

// Inicia un servidor local en el puerto 5000
const localPort = 3001;
app.listen(localPort, () => {
  console.log(`Local server listening on port ${localPort}`);
});

// Conecta a la base de datos
conn.sync({ alter: true })
  .then(() => console.log('Database synchronized successfully'))
  .catch((error) => console.error('Error synchronizing database:', error));
