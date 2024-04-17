'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      email: 'johndoe1@example.com',
      username: 'John Doe 1',
      password: ''
    },
    {
      email: 'johndoe2@example.com',
      username: 'John Doe 2',
      password: ''
    },
    {
      email: 'johndoe3@example.com',
      username: 'John Doe 3',
      password: ''
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
