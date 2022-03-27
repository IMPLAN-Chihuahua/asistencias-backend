'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const dependencias = [];

    for (let i = 0; i < 50; i++) {
      dependencias.push({
        name: `${faker.company.companyName()} - ${i}`,
      })
    }
    await queryInterface.bulkInsert('Dependencias', dependencias, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Dependencias', null, {});
  }
};
