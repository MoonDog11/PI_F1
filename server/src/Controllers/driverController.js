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
    // Obtener datos de conductores desde la API
    const response = await axios.get("https://pif1-production.up.railway.app/drivers");
    const driverData = response.data;

    // Formatear los datos de los conductores
    const drivers = driverData.map((driverData) =>
      formatDriverDataAdvanced(driverData)
    );

    // Obtener conductores existentes de la base de datos
    const existingDrivers = await Driver.findAll();

    // Filtrar conductores nuevos que no existen en la base de datos
    const newDrivers = drivers.filter((driver) => {
      return (
        !existingDrivers.find(
          (existingDriver) => existingDriver.id === driver.id
        ) && driver.driverRef !== null
      ); // Asegurar que driverRef no sea nulo
    });

    // Crear nuevos conductores en la base de datos
    if (newDrivers.length > 0) {
      await Driver.bulkCreate(newDrivers);
      console.log(`${newDrivers.length} drivers saved to database`);
    } else {
      console.log("No new drivers to save");
    }

    // Actualizar banderas de conductores existentes
    existingDrivers.forEach(async (existingDriver) => {
      const matchingDriver = drivers.find(
        (driver) => driver.id === existingDriver.id
      );

      if (matchingDriver && matchingDriver.driverRef !== null) {
        existingDriver.flags = JSON.stringify({
          png: matchingDriver.flags?.png || existingDriver.flags?.png,
          svg: matchingDriver.flags?.svg || existingDriver.flags?.svg,
        });

        await existingDriver.save();
      }
    });

    console.log("Driver flags updated");
  } catch (error) {
    console.error("Error saving drivers to database:", error);
  }
};
const getAllDriversController = async (req, res) => {
  try {
    const drivers = await getAllDriversHandler(req, res);
    res.json(drivers);
  } catch (error) {
    console.error(
      "Error al obtener los conductores desde el controlador:",
      error
    );
    res
      .status(500)
      .send("Error al obtener los conductores desde el controlador");
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
      // Intenta buscar de nuevo convirtiendo el nombre a minúsculas
      const lowercaseName = name.toLowerCase();
      const lowercaseDrivers = await getDriverByNameHandler(lowercaseName);

      if (lowercaseDrivers.length > 0) {
        console.log(
          "Found drivers (case-insensitive search):",
          lowercaseDrivers
        );
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

  // Verifica si se proporcionaron los datos necesarios
  if (!name || !teams || teams.length === 0) {
    return res
      .status(400)
      .json({ error: "Nombre y al menos un equipo son obligatorios." });
  }

  try {
    // Crea el nuevo conductor en la base de datos
    const newDriver = await Driver.create({ name });

    // Relaciona el conductor con los equipos indicados
    await newDriver.addTeams(teams);

    // Recarga el conductor con los equipos relacionados
    const driverWithTeams = await Driver.findByPk(newDriver.id, {
      include: Team,
    });

    // Envía una respuesta exitosa con el conductor y los equipos relacionados
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
  const { team } = req.query; // Obtener el parámetro 'team' de req.query

  try {
    // Llamar a la API externa para obtener los conductores por equipo
    const response = await axios.get(
      `http://localhost:5000/drivers?team=${team}`
    );
    const drivers = response.data;

    // Llamar al handler para manejar los conductores
    const handledDrivers = await searchDriversByTeamHandler(team);
    res.status(200).json(handledDrivers);
  } catch (error) {
    console.error(
      "Error en la búsqueda de conductores por equipo:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Error en la búsqueda de conductores por equipo" });
  }
};

const getAllTeamsController = async (req, res, next) => {
  try {
    // Consultar la base de datos para obtener todos los equipos
    const teams_2 = await Team.find();
    // Enviar los equipos como respuesta
    res.status(200).json({ teams_2 });
  } catch (error) {
    // Manejar cualquier error que ocurra
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

