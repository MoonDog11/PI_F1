const { Router } = require("express");
const fs = require("fs");
const path = require("path");
const {
  getAllDriversController,
  getDriverByNameController,
  getDriverByIdController,
  createDriverController,
} = require("../Controllers/driverController");

const router = Router();

router.get("/database", (req, res) => {
  try {
    // Leer el archivo db.json
    const dbPath = path.join(__dirname, "../api/db.json");
    const data = fs.readFileSync(dbPath, "utf8");
    
    // Convertir los datos a JSON y enviarlos como respuesta
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    console.error("Error al leer la base de datos:", error);
    res.status(500).send("Error al leer la base de datos");
  }
});

// Ruta para obtener todos los conductores
router.get("/drivers", getAllDriversController);

// Ruta para obtener un conductor por su ID
router.get("/drivers/id/:idDriver", getDriverByIdController);

// Ruta para obtener un conductor por su nombre
router.get("/drivers/name/:name", getDriverByNameController);

// Ruta para crear un nuevo conductor
router.post("/driver", createDriverController);

module.exports = router;
