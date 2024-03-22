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

const getDriverByNameController = async (req, res) => {
  try {
    const { name } = req.params;
    const drivers = await getDriverByNameHandler(name);
    
    // Verificar si la respuesta es un objeto JSON válido
    if (typeof drivers === 'object' && drivers !== null) {
      res.json(drivers);
    } else {
      throw new Error('La respuesta no es un objeto JSON válido');
    }
  } catch (error) {
    console.error('Error en la búsqueda de conductores:', error);
    res.status(500).json({ error: 'Error en la búsqueda de conductores' });
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
