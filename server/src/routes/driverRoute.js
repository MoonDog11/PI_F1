const { Router } = require("express");

const {
  getAllDriversController,
  getDriverByNameController,
  getDriverByIdController,
  createDriverController,
  saveDriversToLocalhost,
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

router.post("/drivers", saveDriversToLocalhost);


module.exports = router;
