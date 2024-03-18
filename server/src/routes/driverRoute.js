const { Router } = require("express");
const {
  getAllDriversController,
  getDriverByNameController,
  getDriverByIdController,
  createDriverController,
  saveDriversToDB,
 saveDriversToLocalhost,
  getLocalDriversController,
} = require("../Controllers/driverController");

const router = Router();

// Ruta para obtener todos los conductores
router.get("/drivers", getAllDriversController);

// Ruta para obtener un conductor por su ID
router.get("/drivers/id/:idDriver", getDriverByIdController);

// Ruta para obtener un conductor por su nombre
router.get("/drivers/name/:name", getDriverByNameController);

// Ruta para crear un nuevo conductor
router.post("/drivers", createDriverController);

// Nueva ruta para guardar los conductores en localhost
router.post("/drivers/local", saveDriversToLocalhost);

router.get("/drivers/local", getLocalDriversController);


module.exports = router;
