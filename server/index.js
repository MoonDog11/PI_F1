const express = require('express');
const { conn } = require('./src/db.js');
const driverRoutes = require('./src/routes/driverRoute.js');
const cors = require('cors'); // Importa el middleware CORS

require('dotenv').config();

const { PORT } = process.env;
const app = express();

app.use(express.json()); // Debes mover esto arriba de app.use(driverRoutes) para que el body-parser se aplique antes de las rutas de controladores

// Aplica el middleware CORS solo a las rutas relacionadas con los conductores
app.use('/drivers', cors()); // Aquí deberías aplicar el middleware CORS a las rutas relacionadas con los controladores

app.use(driverRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

conn.sync({ alter: true })
  .then(() => console.log('Database synchronized successfully'))
  .catch((error) => console.error('Error synchronizing database:', error));
