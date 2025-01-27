'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Administradores', [
      {
        id: 10,
        nome: 'Admin',
        email: 'admin@admin.com',
        senha: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Administradores', null, {})
  }
};
