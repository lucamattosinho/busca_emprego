'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CurriculosVagas extends Model {
    static associate(models) {
      CurriculosVagas.belongsTo(models.Curriculo);
      CurriculosVagas.belongsTo(models.Vaga);
    }
  }
  CurriculosVagas.init(
    {
      VagaId: DataTypes.INTEGER,
      CurriculoId: DataTypes.INTEGER,
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Enviada', 
      },
      dataAtualizacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, 
        allowNull: false,
      },
      indicacao: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'CurriculosVagas',
    }
  );
  return CurriculosVagas;
};
