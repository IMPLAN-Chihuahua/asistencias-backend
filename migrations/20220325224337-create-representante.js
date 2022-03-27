'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Representantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hasVoto: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      checkedIn: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      idDependencia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Dependencias',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Representantes');
  }
};