const { Driver, Team } = require("../db");

const getAllDriversHandler = async () => {
  try {
    const drivers = await Driver.findAll();
    return drivers;
  } catch (error) {
    console.error("Error al obtener los conductores desde el handler:", error);
    throw error;
  }
};

const getDriverByIdHandler = async (idDriver) => {
  try {
    const driver = await Driver.findByPk(idDriver, { include: Team });
    return driver;
  } catch (error) {
    console.error("Error al obtener el conductor por ID desde el handler:", error);
    throw error;
  }
};

const getDriverByNameHandler = async (name) => {
  try {
    console.log("Searching for driver in the database with name:", name);
    const lowercaseName = name.toLowerCase();
    const drivers = await Driver.findAll({
      where: {
        [Op.or]: [
          { 'name.forename': { [Op.like]: `%${lowercaseName}%` } },
          { 'name.surname': { [Op.like]: `%${lowercaseName}%` } }
        ]
      },
      include: Team,
    });

    return drivers;
  } catch (error) {
    console.error("Error al buscar conductores por nombre:", error);
    throw error;
  }
};

const searchDriversByTeamHandler = async (team) => {
  try {
    console.log("Equipo proporcionado:", team);
    // Implementa la lógica para buscar conductores por equipo aquí
  } catch (error) {
    console.error("Error en la búsqueda de conductores por equipo:", error.message);
    throw error;
  }
};

module.exports = {
  getAllDriversHandler,
  getDriverByIdHandler,
  getDriverByNameHandler,
  searchDriversByTeamHandler,
};
