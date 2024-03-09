const axios = require("axios");
const { Driver, Team } = require("../db");
const {
  getAllDriversHandler,
  getDriverByNameHandler,
  getDriverByIdHandler,
  searchDriversByTeamHandler,
} = require("../Handlers/driverHandler");

const getAllDriversController = async (req, res) => {
  try {
    const response = await axios.get("https://pif1-production.up.railway.app/drivers");
    const drivers = response.data;
    res.json(drivers);
  } catch (error) {
    console.error("Error al obtener los conductores desde el controlador:", error);
    res.status(500).send("Error al obtener los conductores desde el controlador");
  }
};

const getDriverByNameController = async (req, res) => {
  const { name } = req.query;

  try {
    const drivers = await getDriverByNameHandler(name);
    res.json(drivers);
  } catch (error) {
    console.error("Error al obtener conductores por nombre:", error);
    res.status(500).send("Error al obtener conductores por nombre");
  }
};

const createDriverController = async (req, res) => {
  const { name, teams } = req.body;

  try {
    const newDriver = await Driver.create({ name });
    await newDriver.addTeams(teams);
    const driverWithTeams = await Driver.findByPk(newDriver.id, { include: Team });

    res.status(201).json({
      message: "Conductor creado exitosamente",
      driver: driverWithTeams,
    });
  } catch (error) {
    console.error("Error al crear el conductor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getDriverByIdController = async (req, res) => {
  const { idDriver } = req.params;

  try {
    const driver = await getDriverByIdHandler(idDriver);
    res.json(driver);
  } catch (error) {
    console.error("Error al obtener el conductor por ID:", error);
    res.status(500).send("Error al obtener el conductor por ID");
  }
};

const searchDriversByTeamController = async (req, res) => {
  const { team } = req.query;

  try {
    const handledDrivers = await searchDriversByTeamHandler(team);
    res.status(200).json(handledDrivers);
  } catch (error) {
    console.error("Error en la búsqueda de conductores por equipo:", error.message);
    res.status(500).json({ error: "Error en la búsqueda de conductores por equipo" });
  }
};

const getAllTeamsController = async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.status(200).json({ teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllDriversController,
  getDriverByNameController,
  createDriverController,
  getDriverByIdController,
  searchDriversByTeamController,
  getAllTeamsController,
};
