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
router.get("/drivers/id/:idDriver", getDriverByIdController);
router.get("/drivers/:name", getDriverByNameController);
router.post("/drivers", createDriver);

module.exports = router;
