const { Driver, Team } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

const loadDriversToRailwayController = async (req, res) => {
  try {
    // Obtener todos los conductores de la base de datos local
    const drivers = await Driver.findAll();

    // Crear una lista de datos de conductores para cargar en Railway
    const dataToUpload = drivers.map(driver => ({
      name: driver.name,
      // Añade aquí cualquier otro campo que necesites cargar en Railway
    }));

    // Hacer una solicitud a la API de Railway para cargar los datos
    const response = await axios.post("https://api.railway.app/v1/data/load", {
      table: "Driver", // Ajusta esto al nombre de tu tabla en Railway
      data: dataToUpload,
    });

    // Comprobar si la carga de datos fue exitosa en Railway
    if (response.status === 200) {
      res.status(200).json({ message: "Datos de conductores cargados en Railway exitosamente" });
    } else {
      throw new Error("Error al cargar los datos en Railway");
    }
  } catch (error) {
    console.error("Error al cargar los datos de los conductores en Railway:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


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
    const isSurname = name.includes(".");

    // Construir la parte de la URL según si es un apellido o un nombre
    let url;
    if (isSurname) {
      url = `http://localhost:5000/drivers?name.surname=${lowercaseName}`;
    } else {
      url = `http://localhost:5000/drivers?name.forename=${lowercaseName}`;
    }

    console.log("API URL:", url);

    // Realizar la solicitud a la API
    const response = await fetch(url);
    const data = await response.json();

    console.log("API Response inside action:", data);

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
  loadDriversToRailwayController,
  createDriverHandler,
  getAllDriversHandler,
  getDriverByNameHandler,
  getDriverByIdHandler,
  searchDriversByTeamHandler,
};
