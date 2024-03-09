const { getAllDriversHandler } = require("../Handlers/driverHandler");
const { getDriverByNameHandler } = require("../Handlers/driverHandler");
const { getDriverByIdHandler } = require("../Handlers/driverHandler");
const { searchDriversByTeamHandler } = require("../Handlers/driverHandler");
const { Driver, Team } = require("../db");
const axios = require("axios");

const formatDriverDataAdvanced = (driverData) => {
  // Asegurarse de que driverRef tenga un valor predeterminado
  const driverRef = driverData.driverRef || "defaultDriverRef";

  // Formatear la fecha de nacimiento si está presente
  const dob = driverData.dob ? new Date(driverData.dob).toISOString() : null;

  // Formatear los equipos como un array de IDs si están presentes
  const teams = driverData.teams
    ? driverData.teams.map((team) => team.id)
    : null;

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
    dob: dob,
    nationality: driverData.nationality || null,
    url: driverData.url || null,
    teams: teams,
    description: driverData.description || null,
  };
};


const saveDriversToDB = async () => {
  try {
    const response = await axios.get("https://pif1-production.up.railway.app/drivers");
    const driverData = response.data;

    const existingDrivers = await Driver.findAll();

    const newDrivers = driverData.filter((driver) => {
      return (
        !existingDrivers.find((existingDriver) => existingDriver.id === driver.id) &&
        driver.driverRef !== null
      );
    });

    if (newDrivers.length > 0) {
      await Driver.bulkCreate(newDrivers);
      console.log(`${newDrivers.length} drivers saved to database`);
    } else {
      console.log("No new drivers to save");
    }

    console.log("Driver flags updated");
  } catch (error) {
    console.error("Error saving drivers to database:", error);
  }
};

const getAllDriversController = async (req, res) => {
  try {
    // Implementa la lógica para obtener todos los conductores desde la base de datos
    // o desde la API externa si es necesario
    res.status(200).json({ message: "Implementación de getAllDriversController" });
  } catch (error) {
    console.error("Error al obtener los conductores desde el controlador:", error);
    res.status(500).send("Error al obtener los conductores desde el controlador");
  }
};

const getDriverByNameController = async (req, res) => {
  try {
    // Implementa la lógica para obtener un conductor por nombre
    res.status(200).json({ message: "Implementación de getDriverByNameController" });
  } catch (error) {
    console.error("Error al obtener conductores por nombre:", error);
    res.status(500).send("Error al obtener conductores por nombre");
  }
};

const createDriverController = async (req, res) => {
  try {
    // Implementa la lógica para crear un nuevo conductor
    res.status(201).json({ message: "Implementación de createDriverController" });
  } catch (error) {
    console.error("Error al crear el conductor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getDriverByIdController = async (req, res) => {
  try {
    // Implementa la lógica para obtener un conductor por ID
    res.status(200).json({ message: "Implementación de getDriverByIdController" });
  } catch (error) {
    console.error("Error al obtener el conductor por ID:", error);
    res.status(500).send("Error al obtener el conductor por ID");
  }
};

const searchDriversByTeamController = async (req, res) => {
  try {
    // Implementa la lógica para buscar conductores por equipo
    res.status(200).json({ message: "Implementación de searchDriversByTeamController" });
  } catch (error) {
    console.error("Error en la búsqueda de conductores por equipo:", error.message);
    res.status(500).json({ error: "Error en la búsqueda de conductores por equipo" });
  }
};

const getAllTeamsController = async (req, res) => {
  try {
    // Implementa la lógica para obtener todos los equipos desde la base de datos
    res.status(200).json({ message: "Implementación de getAllTeamsController" });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  createDriverController,
  saveDriversToDB,
  getAllDriversController,
  getDriverByNameController,
  getDriverByIdController,
  searchDriversByTeamController,
  getAllTeamsController,
  formatDriverDataAdvanced,
};
