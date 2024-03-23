const express = require('express');
const { conn } = require('./src/db.js');
const driverRoutes = require('./src/routes/driverRoute.js');
const cors = require('cors'); // Importa el middleware CORS

require('dotenv').config();

const { PORT } = process.env;
const app = express();

// Aplica el middleware CORS solo a las rutas relacionadas con los conductores
app.use('/drivers', cors()); // Esto asegura que el middleware CORS solo se aplique a las rutas relacionadas con los conductores
app.use(driverRoutes);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

conn.sync({ alter: true })
  .then(() => console.log('Database synchronized successfully'))
  .catch((error) => console.error('Error synchronizing database:', error));

