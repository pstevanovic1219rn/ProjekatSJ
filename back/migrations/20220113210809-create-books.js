'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      isbn: {
        allowNull: false,
        type: DataTypes.STRING
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
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Locations',
          key: 'id'
        },
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
    await queryInterface.dropTable('Books');
  }
};