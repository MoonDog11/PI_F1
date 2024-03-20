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


const railwayURL = 'https://pif1-production.up.railway.app/drivers';

const saveDriversToLocalhost = async (req, res, driversData) => {
  try {
    if (!driversData || driversData.length === 0) {
      console.log("No drivers data provided.");
      return;
    }

    // Guardar los datos de los conductores en la base de datos
    // Código para guardar los datos en la base de datos...

    // Enviar una solicitud POST a la URL especificada
    const response = await axios.post(railwayURL, driversData);
    
    if (response.status === 200) {
      console.log("Drivers data saved successfully to the specified URL.");
      if (res) {
        res.status(200).send("Drivers data saved successfully to the specified URL.");
      }
    } else {
      console.log("Error occurred while saving drivers data to the specified URL.");
      if (res) {
        res.status(500).send("Error occurred while saving drivers data to the specified URL.");
      }
    }
  } catch (error) {
    console.error("Error saving drivers data to the specified URL:", error);
    if (res) {
      res.status(500).send("Error saving drivers data to the specified URL.");
    }
  }
};



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
    const drivers = await Driver.findAll();
    res.status(200).json(drivers);
  } catch (error) {
    console.error("Error al obtener los conductores:", error);
    res.status(500).json({ error: "Error interno del servidor" });
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
    const response = await axios.get(`https://pif1-production.up.railway.app/drivers?team=${team}`);
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

const getAllDriversFromRailwayController = async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    const response = await axios.post(railwayURL, drivers);
    
    if (response.status === 200) {
      res.status(200).json({ message: "Drivers data loaded successfully to Railway URL" });
    } else {
      console.error("Error loading drivers data to Railway URL");
      res.status(500).json({ error: "Error loading drivers data to Railway URL" });
    }
  } catch (error) {
    console.error("Error getting drivers from Railway:", error);
    res.status(500).json({ error: "Error getting drivers from Railway" });
  }
};
module.exports = {
  createDriverController,
  getAllDriversFromRailwayController,
  getAllDriversController,
  getDriverByNameController,
  getDriverByIdController,
  searchDriversByTeamController,
  getAllTeamsController,
  fetchDataFromLocalhost,
  saveDriversToLocalhost,
};
