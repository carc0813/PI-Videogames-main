const { DataTypes } = require("sequelize");
//Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  sequelize.define("genre", {
   
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
