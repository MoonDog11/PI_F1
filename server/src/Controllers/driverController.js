const axios = require("axios");
const { Driver, Team } = require("../db");
const {
  getAllDriversHandler,
  getDriverByNameHandler,
  getDriverByIdHandler,
  searchDriversByTeamHandler,
} = require("../Handlers/driverHandler");

const saveDriversToDB = async () => {
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

  try {
    // Obtener datos de conductores desde la API
    const response = await axios.get("http://localhost:5000/drivers");
    const driverData = response.data;

    // Formatear los datos de los conductores
    const drivers = driverData.map((driverData) =>
      formatDriverData(driverData)
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
    const response = await axios.get(
      "http://pif1-production.up.railway.app/drivers"
    );
    const drivers = response.data;
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
    const driverWithTeams = await Driver.findByPk(newDriver.id, {
      include: Team,
    });

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
    console.error(
      "Error en la búsqueda de conductores por equipo:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Error en la búsqueda de conductores por equipo" });
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
  saveDriversToDB,
  getAllDriversController,
  getDriverByNameController,
  createDriverController,
  getDriverByIdController,
  searchDriversByTeamController,
  getAllTeamsController,
};
