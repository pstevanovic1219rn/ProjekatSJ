'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Books}) {
      // define association here
      this.hasMany(Books, {foreignKey: 'locationId', as: 'books', onDelete: 'cascade', hooks: true});
    }
  };
  Locations.init({
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Locations',
  });
  return Locations;
};