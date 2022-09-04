'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Locations, Rentals}) {
      // define association here
      this.belongsTo(Locations, {foreignKey: 'locationId', as: 'location'});
      this.hasMany(Rentals, {foreignKey: 'bookId', as: 'rental', onDelete: 'cascade', hooks: true});
    }
  };
  Books.init({
    isbn: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};