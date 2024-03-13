const { Driver, Team } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

const getAllDriversController = async (req, res) => {
  try {
    // Aquí realizamos una solicitud a la API de Railway para obtener todos los conductores
    const response = await axios.get("https://pif1-production.up.railway.app/api/drivers");
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
    console.log("Buscando conductor con nombre:", name);
    // Hacemos una solicitud a la API de Railway para buscar conductores por nombre
    const response = await axios.get(`https://pif1-production.up.railway.app/api/drivers?name=${name}`);
    const drivers = response.data;

    if (drivers.length > 0) {
      console.log("Conductores encontrados:", drivers);
      res.json(drivers);
    } else {
      console.log("Conductor no encontrado");
      res.status(404).send("Conductor no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener conductores por nombre:", error);
    res.status(500).send("Error al obtener conductores por nombre");
  }
};

const createDriverController = async (req, res) => {
  const { name, teams } = req.body;

  // Verificar si se proporcionaron los datos necesarios
  if (!name || !teams || teams.length === 0) {
    return res
      .status(400)
      .json({ error: "El nombre y al menos un equipo son obligatorios." });
  }

  try {
    // Hacemos una solicitud a la API de Railway para crear un nuevo conductor
    const response = await axios.post("https://pif1-production.up.railway.app/api/drivers", { name, teams });
    const { driver } = response.data;
    res.status(201).json({
      message: "Conductor creado exitosamente",
      driver,
    });
  } catch (error) {
    console.error("Error al crear el conductor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getDriverByIdController = async (req, res) => {
  const { idDriver } = req.params;

  try {
    // Hacemos una solicitud a la API de Railway para obtener un conductor por su ID
    const response = await axios.get(`https://pif1-production.up.railway.app/api/drivers/${idDriver}`);
    const driver = response.data;

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
    // Hacemos una solicitud a la API de Railway para buscar conductores por equipo
    const response = await axios.get(`https://pif1-production.up.railway.app/api/drivers?team=${team}`);
    const drivers = response.data;
    res.status(200).json(drivers);
  } catch (error) {
    console.error("Error en la búsqueda de conductores por equipo:", error.message);
    res.status(500).json({ error: "Error en la búsqueda de conductores por equipo" });
  }
};

const getAllTeamsController = async (req, res, next) => {
  try {
    // Hacemos una solicitud a la API de Railway para obtener todos los equipos
    const response = await axios.get("https://pif1-production.up.railway.app/api/teams");
    const teams = response.data;
    res.status(200).json({ teams });
  } catch (error) {
    console.error("Error al obtener los equipos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createDriverController,
  getAllDriversController,
  getDriverByNameController,
  getDriverByIdController,
  searchDriversByTeamController,
  getAllTeamsController,
};
