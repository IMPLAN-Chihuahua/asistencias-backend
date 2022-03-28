'use strict';

const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const representantes = [];
    for (let i = 0; i < 100; i++) {
      let checkedIn = faker.datatype.boolean();
      representantes.push({
        name: faker.name.findName(),
        hasVoto: faker.datatype.boolean(),
        checkedIn,
        checkInDate: checkedIn ? new Date() : null,
        inMeeting: checkedIn,
        idDependencia: ((i + 1) % 50) + 1,
        leftAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Representantes', representantes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Representantes', null, {});
  }
};
