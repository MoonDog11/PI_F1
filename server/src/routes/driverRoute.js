const { Router } = require("express");
const {
  getAllDriversController,
  getDriverByNameController, 
  getDriverByIdController,
  createDriverController,
  getAllDriversFromRailwayController,
} = require("../Controllers/driverController");

const router = Router();

router.get("/drivers", getAllDriversController);
router.get("/drivers/search", getDriverByNameController);
router.get("/drivers/:idDriver", getDriverByIdController);
router.get("/drivers/local", getAllDriversFromRailwayController);
router.post("/drivers", createDriverController);

module.exports = router;
