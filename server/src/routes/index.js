const { Router } = require("express");
const router = Router();

// Aquí importa y utiliza tus rutas específicas
const driverRoutes = require("./driverRoute.js");
router.use(driverRoutes);

module.exports = router;
