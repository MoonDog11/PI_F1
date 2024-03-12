const axios = require("axios");
const server = require("./src/server");
const { conn, Driver } = require("./src/db.js"); // Importa Driver desde db.js
require("dotenv").config();
const { saveDataToDatabase } = require("./src/Controllers/driverController"); // Importa saveDataToDatabase desde driverController

conn
  .sync({ alter: true })
  .then(() => {
    server.listen(process.env.PORT, async () => {
      console.log(`Server listening on port, ${process.env.PORT}`);
      try {
        const response = await axios.get("http://pif1-production.up.railway.app/drivers");
        const drivers = response.data;
        const saveResult = await saveDataToDatabase(Driver, drivers); // Usa Driver aquí
        if (saveResult.success) {
          console.log("Drivers saved successfully to database");
        } else {
          console.error("Error saving drivers to database");
        }
      } catch (error) {
        console.error("Error fetching or saving drivers:", error);
      }
    });
  })
  .catch((error) => console.error(error));
