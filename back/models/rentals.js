'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rentals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Books, Customers}) {
      // define association here
      this.belongsTo(Books, {foreignKey: 'bookId', as: 'book'});
      this.belongsTo(Customers, {foreignKey: 'customerId', as: 'customer'});
    }
  };
  Rentals.init({
    returnedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Rentals',
  });
  return Rentals;
};