const { getAllDriversHandler, getDriverByNameHandler, getDriverByIdHandler, searchDriversByTeamHandler } = require("../Handlers/driverHandler");
const { Driver, Team } = require("../db");
const axios = require("axios");


const formatDriverData = (driverData) => {
  // Asegurarse de que driverRef tenga un valor predeterminado
  const driverRef = driverData.driverRef || "defaultDriverRef";

  return {
    id: driverData.id || null,
    driverRef: driverRef,
    number: driverData.number || null,
    code: driverData.code || null,
    name: {
      forename: driverData.name ? driverData.name.forename || null : null,
      surname: driverData.name ? driverData.name.surname || null : null,
    },
    image: driverData.image
      ? JSON.stringify({
          url: driverData.image.url || null,
          imageby: driverData.image.imageby || null,
        })
      : null,
    dob: driverData.dob || null,
    nationality: driverData.nationality || null,
    url: driverData.url || null,
    teams: driverData.teams || null,
    description: driverData.description || null,
  };
};

async function saveDriversToLocalhost(req, res, driversData) {
  try {
    await Driver.bulkCreate(driversData, { ignoreDuplicates: true }); // Guardar los conductores en la base de datos local
    if (res) {
      res.status(200).send("Drivers saved to localhost successfully");
    } else {
      console.log("No response object provided. Unable to send response.");
    }
  } catch (error) {
    console.error("Error saving drivers to localhost:", error);
    if (res) {
      res.status(500).send("Error saving drivers to localhost");
    } else {
      console.log("No response object provided. Unable to send error response.");
    }
  }
}

async function fetchDataFromLocalhost() {
  try {
    const response = await axios.get('http://localhost:5000/drivers');
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del servidor local:', error);
    throw error;
  }
}

const getAllDriversController = async (req, res) => {
  try {
    // Obtener los datos de los conductores del servidor local en el puerto 5000
    const response = await axios.get('http://localhost:5000/drivers');
    const drivers = response.data;

    // Enviar los datos de los conductores al servidor en Railway
    await saveDriversToLocalhost(drivers);

    // Responder con los datos de los conductores obtenidos del servidor local
    res.json(drivers);
  } catch (error) {
    console.error("Error al obtener los conductores desde el handler:", error);
    res.status(500).send("Error al obtener los conductores desde el handler");
  }
};

const getDriverByNameController = async (req, res) => {
  const { name } = req.query;

  try {
    console.log("Searching for driver with name:", name);
    const drivers = await getDriverByNameHandler(name);

    if (drivers.length > 0) {
      console.log("Found drivers:", drivers);
      res.json(drivers);
    } else {
      const lowercaseName = name.toLowerCase();
      const lowercaseDrivers = await getDriverByNameHandler(lowercaseName);

      if (lowercaseDrivers.length > 0) {
        console.log("Found drivers (case-insensitive search):", lowercaseDrivers);
        res.json(lowercaseDrivers);
      } else {
        console.log("Driver not found");
        res.status(404).send("Conductor no encontrado");
      }
    }
  } catch (error) {
    console.error("Error al obtener conductores por nombre:", error);
    res.status(500).send("Error al obtener conductores por nombre");
  }
};

const createDriverController = async (req, res) => {
  const { name, teams } = req.body;

  if (!name || !teams || teams.length === 0) {
    return res.status(400).json({ error: "Nombre y al menos un equipo son obligatorios." });
  }

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

    if (driver) {
      res.json(driver);
    } else {
      res.status(404).send("Conductor no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el conductor por ID:", error);
    res.status(500).send("Error al obtener el conductor por ID");
  }
};

const searchDriversByTeamController = async (req, res) => {
  const { team } = req.query;

  try {
    const response = await axios.get(`http://localhost:5000/drivers?team=${team}`);
    const drivers = response.data;

    const handledDrivers = await searchDriversByTeamHandler(team);
    res.status(200).json(handledDrivers);
  } catch (error) {
    console.error("Error en la búsqueda de conductores por equipo:", error.message);
    res.status(500).json({ error: "Error en la búsqueda de conductores por equipo" });
  }
};

const getAllTeamsController = async (req, res, next) => {
  try {
    const teams = await Team.findAll();
    res.status(200).json({ teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  createDriverController,
  saveDriversToLocalhost,
  getAllDriversController,
  getDriverByNameController,
  getDriverByIdController,
  searchDriversByTeamController,
  getAllTeamsController,
  fetchDataFromLocalhost,
};
