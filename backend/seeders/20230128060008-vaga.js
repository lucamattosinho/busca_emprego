'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Vagas',
      [
        {
          id: 1,
          titulo: 'Segurança',
          periodo: 'Das 8:00 as 18:00',
          descricao: 'Mimir',
          salario: '2475.75',
          EmpresaId: 1,
          visualizar: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          titulo: 'Programador Web Full Stack',
          periodo: 'Flexível',
          descricao: 'Mimir',
          salario: '29475.75',
          EmpresaId: 2,
          visualizar: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vagas', null, {})
  }
}
