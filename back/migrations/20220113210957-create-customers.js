'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Customers');
  }
};