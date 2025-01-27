'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'CurriculosVagas',
      [
        {
          VagaId: 1,
          CurriculoId: 1,
          status: 'Em análise',
          dataAtualizacao: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          indicacao: true
        },
        {
          VagaId: 1,
          CurriculoId: 2,
          status: 'Em análise',
          dataAtualizacao: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          indicacao: false
        },
        {
          VagaId: 2,
          CurriculoId: 1,
          status: 'Em análise',
          dataAtualizacao: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          indicacao: true
        },
        {
          VagaId: 2,
          CurriculoId: 2,
          status: 'Em análise',
          dataAtualizacao: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          indicacao: false
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CurriculosVagas', null, {})
  }
}
