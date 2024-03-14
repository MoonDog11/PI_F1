const { exec } = require('child_process');
const server = require("./src/server");
const { conn } = require("./src/db.js");
require("dotenv").config();
const { PORT, DB_HOST, DB_PORT, DB_USER, DB_NAME } = process.env;

conn
  .sync()
  .then(() => {
    // Generar respaldo de la base de datos
    const dumpCommand = `pg_dump -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME} -Fc > database_dump.dump`;
    exec(dumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('Error generating database backup:', error);
        return;
      }
      console.log('Database backup generated successfully.');
    });

    // Iniciar el servidor
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
