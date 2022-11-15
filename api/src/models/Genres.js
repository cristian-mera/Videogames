const { DataTypes, INTEGER } = require('sequelize');

module.exports = (sequelize) =>  {
  sequelize.define('genres', {
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};