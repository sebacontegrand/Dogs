const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Dog", {
    id : {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight_min:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height_max:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight_max:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
      isUrl:true,
      }
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true
    },
    origin:{
      type: DataTypes.STRING,
      allowNull: false
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }
  );
};
