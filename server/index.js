const express = require('express');
const { conn } = require('./src/db.js');
const driverRoutes = require('./src/routes/driverRoute.js');

require('dotenv').config();

const { PORT } = process.env;
const app = express();

app.use(driverRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

conn.sync({ alter: true })
  .then(() => console.log('Database synchronized successfully'))
  .catch((error) => console.error('Error synchronizing database:', error));

