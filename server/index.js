const { exec } = require('child_process');
const server = require("./src/server");
const { conn } = require("./src/db.js");
require("dotenv").config();
const { saveDriversToDB } = require("./src/Controllers/driverController"); 

conn
  .sync({ alter: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      saveDriversToDB();
    });
  })
  .catch((error) => console.error(error));
