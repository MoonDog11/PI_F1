// models/Driver.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Driver = sequelize.define(
    "Driver",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: true, // Puedes establecer allowNull a true si deseas que el id también pueda ser nulo
      },
      driverref: {
        type: DataTypes.STRING,
        allowNull: true, // Permite que driverref sea nulo
      },
      number: {
        type: DataTypes.STRING,
        allowNull: true, // Permite que number sea nulo
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true, // Permite que code sea nulo
      },
      name: {
        type: DataTypes.JSONB,
        defaultValue: null, // Establece el valor predeterminado como nulo
      },
      image: {
        type: DataTypes.JSONB,
        defaultValue: null, // Establece el valor predeterminado como nulo
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true, // Permite que dob sea nulo
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: true, // Permite que nationality sea nulo
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true, // Permite que url sea nulo
      },
      teams: {
        type: DataTypes.STRING,
        allowNull: true, // Permite que teams sea nulo
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true, // Permite que description sea nulo
      },
      forename: {
        type: DataTypes.STRING,
        allowNull: true, // Permite que forename sea nulo
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: true, // Permite que surname sea nulo
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
    }
  );

  return Driver;
};