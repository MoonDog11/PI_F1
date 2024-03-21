const { Router } = require("express");
const {
  getAllDriversController,
  getDriverByNameController, // Cambiado de /drivers/:name a /drivers/name/:name
  getDriverByIdController,
  createDriverController,
  getAllDriversFromRailwayController,
} = require("../Controllers/driverController");

const router = Router();

router.get("/drivers", getAllDriversController);
router.get("/drivers/:name", getDriverByNameController);
router.get("/drivers/:idDriver", getDriverByIdController);
router.get("/drivers/local", getAllDriversFromRailwayController);
router.post("/drivers", createDriverController);

module.exports = router;
