'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Curriculo extends Model {
    static associate(models) {
      Curriculo.belongsToMany(models.Idiomas, {
        through: 'CurriculosIdiomas'
      })

      Curriculo.belongsToMany(models.Cursos, {
        through: 'CurriculosCursos'
      })

      Curriculo.belongsToMany(models.Experiencias, {
        through: 'CurriculosExperiencias'
      })

      Curriculo.belongsToMany(models.Vaga, {
        through: 'CurriculosVagas'
      })
    }
  }
  Curriculo.init(
    {
      perfil: DataTypes.TEXT,
      email: DataTypes.STRING(80),
      senha: DataTypes.STRING(22),
      nome: DataTypes.STRING(100),
      cpf: DataTypes.CHAR(11),
      endereco: DataTypes.STRING(80),
      bairro: DataTypes.STRING(80),
      cidade: DataTypes.STRING(80),
      estado: DataTypes.STRING(80),
      pais: DataTypes.STRING(80),
      numero: DataTypes.INTEGER,
      complemento: DataTypes.STRING(80),
      telefone: DataTypes.STRING(45),
      genero: DataTypes.CHAR(1),
      deficiencia: DataTypes.STRING(80),
      cep: DataTypes.CHAR(8),
      pretensao: DataTypes.FLOAT,
      descricao: DataTypes.TEXT,
      areaAtuacao: DataTypes.STRING(80),
      visualizar: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Curriculo'
    }
  )
  return Curriculo
}
