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
router.get("/drivers/id/:idDriver", getDriverByIdController);
router.get("/drivers/name/:name", getDriverByNameController);
router.post("/drivers", createDriverController);
router.get("/drivers/local", getAllDriversFromRailwayController);


module.exports = router;
