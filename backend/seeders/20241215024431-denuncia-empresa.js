'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DenunciasEmpresas', [
      {
        descricao: 'Empresa não cumpriu com o combinado',
        status: 'Pendente',
        id_denunciante: 1,
        id_empresa: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descricao: 'Empresa não cumpriu com o combinado',
        status: 'Pendente',
        id_denunciante: 2,
        id_empresa: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
