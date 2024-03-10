const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const { saveDriversToDB } = require("./src/Controllers/driverController"); // Import both functions

const PORT = 3002;

conn
  .sync({ alter: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      saveDriversToDB();
    });
  })
  .catch((error) => console.error(error));
