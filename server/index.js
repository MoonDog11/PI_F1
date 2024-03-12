const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
require("dotenv").config();
const { saveDataToDatabase } = require("./src/Controllers/driverController"); // Import both functions



conn
  .sync({ alter: true })
  .then(() => {
    server.listen(process.env.PORT, async () => {
  console.log(`Server listening on port, ${process.env.PORT}`);
  const response = await axios.get("http://pif1-production.up.railway.app/drivers");
  const drivers = response.data;
  const saveResult = await saveDataToDatabase(Driver, drivers);
  if (saveResult.success) {
    console.log("Drivers saved successfully to database");
  } else {
    console.error("Error saving drivers to database");
  }
});
