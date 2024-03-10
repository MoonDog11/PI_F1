const { Driver, Team } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

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
   saveDriversToDB,
  createDriverHandler,
  getAllDriversHandler,
  getDriverByNameHandler,
  getDriverByIdHandler,
  searchDriversByTeamHandler,
};
