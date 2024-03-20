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
router.get("/drivers/local", getAllDriversFromRailwayController);
router.post("/drivers", createDriverController);
router.get("/drivers/name/:name", getDriverByNameController); 
router.get("/drivers/:idDriver", getDriverByIdController);


module.exports = router;
