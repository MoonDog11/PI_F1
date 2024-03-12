const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
require("dotenv").config();
const { saveDriversToDB } = require("./src/Controllers/driverController"); // Import both functions



conn
  .sync({ alter: true })
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server listening on port, ${process.env.PORT}`);
      saveDriversToDB();
    });
  })
  .catch((error) => console.error(error));
