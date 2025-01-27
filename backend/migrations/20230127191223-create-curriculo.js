'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Curriculos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      perfil: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      email: {
        type: Sequelize.DataTypes.STRING(80),
        allowNull: false,
        unique: true
      },
      senha: {
        type: Sequelize.DataTypes.STRING(22),
        allowNull: false
      },
      nome: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      cpf: {
        type: Sequelize.DataTypes.CHAR(11),
        allowNull: false,
        unique: true
      },
      endereco: {
        type: Sequelize.DataTypes.STRING(80),
        allowNull: false
      },
      bairro: {
        type: Sequelize.DataTypes.STRING(80),
        allowNull: false
      },
      cidade: {
        type: Sequelize.DataTypes.STRING(80),
        allowNull: false
      },
      estado: {
        type: Sequelize.DataTypes.STRING(80),
        allowNull: false
      },
      pais: {
        type: Sequelize.DataTypes.STRING(80),
        allowNull: false
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      complemento: {
        type: Sequelize.DataTypes.STRING(80),
        allowNull: true
      },
      telefone: {
        type: Sequelize.DataTypes.STRING(45),
        allowNull: false
      },
      genero: {
        type: Sequelize.DataTypes.CHAR(1),
        allowNull: true
      },
      deficiencia: {
        type: Sequelize.DataTypes.STRING(80),
        allowNull: false
      },
      cep: {
        type: Sequelize.DataTypes.CHAR(8),
        allowNull: false
      },
      pretensao: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      areaAtuacao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      visualizar: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Curriculos')
  }
}
