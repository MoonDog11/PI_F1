const { Driver, Team } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

const getAllDriversHandler = async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    res.json(drivers);
  } catch (error) {
    console.error("Error al obtener los conductores desde el handler:", error);
    res.status(500).send("Error al obtener los conductores desde el handler");
  }
};

const createDriverHandler = async (req, res) => {
  try {
    await createDriverController(req, res);
  } catch (error) {
    console.error("Error en el controlador del conductor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getDriverByIdHandler = async (idDriver) => {
  try {
    const driver = await Driver.findByPk(idDriver, {
      include: Team,
    });

    return driver;
  } catch (error) {
    console.error(
      "Error al obtener el conductor por ID desde el handler:",
      error
    );
    throw error;
  }
};
const getDriverByNameHandler = async (name) => {
  try {
    console.log("Searching for driver in the database with name:", name);
    // Convertir el nombre a minúsculas antes de la búsqueda
    const lowercaseName = name.toLowerCase();

    // Verificar si el parámetro parece ser solo un apellido
    const isSurname = lowercaseName.includes(".");

    // Construir la parte de la URL según si es un apellido o un nombre
    let url;
    if (isSurname) {
      url = `https://pif1-production.up.railway.app/drivers?name.surname=${lowercaseName}`;
    } else {
      url = `https://pif1-production.up.railway.app/drivers?name.forename=${lowercaseName}`;
    }

    console.log("API URL:", url);

    // Realizar la solicitud a la API
    const response = await fetch(url);
    const data = await response.json();

    console.log("API Response inside handler:", data);

    return data;
  } catch (error) {
    console.error("Error al buscar conductores por nombre:", error);
    throw error;
  }
};

const searchDriversByTeamHandler = async (team) => {
  try {
    // Aquí puedes realizar cualquier manipulación o procesamiento adicional de los conductores si es necesario
    console.log("Equipo proporcionado:", team);

    // Simplemente devolvemos un objeto de ejemplo por ahora
    return { message: `Drivers encontrados para el equipo ${team}` };
  } catch (error) {
    console.error(
      "Error en la búsqueda de conductores por equipo:",
      error.message
    );
    throw error;
  }
};

module.exports = {
  createDriverHandler,
  getAllDriversHandler,
  getDriverByNameHandler,
  getDriverByIdHandler,
  searchDriversByTeamHandler,
};
