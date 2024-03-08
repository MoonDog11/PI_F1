const { Router } = require("express");
const {
  getAllDriversController,
  getDriverByNameController,
  getDriverByIdController,
  createDriver,
} = require("../Controllers/driverController");
const router = Router();

// Ruta para obtener todos los conductores
router.get("/drivers", getAllDriversController);
router.get("/drivers/id/:idDriver", getDriverByIdController); // Modificación en la ruta para obtener conductor por ID
router.get("/drivers/name/:name", getDriverByNameController); // Modificación en la ruta para obtener conductor por nombre
router.post("/drivers", createDriver);

module.exports = router;
