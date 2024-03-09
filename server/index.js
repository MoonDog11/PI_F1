const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");

require("dotenv").config();


conn
  .sync({ alter: true })
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("Server listening on", process.env.PORT);
    });
  })
  .catch((error) => console.error(error));
