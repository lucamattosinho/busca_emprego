'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class DenunciaCurriculo extends Model {
        static associate(models) {
            DenunciaCurriculo.belongsTo(models.Curriculo, {
                foreignKey: 'curriculoId'
        })
    };
    }
    DenunciaCurriculo.init(
        {
        descricao: DataTypes.STRING(300),
        status: DataTypes.STRING(20),
        },
        {
        sequelize,
        modelName: 'DenunciaCurriculo'
        }
    )
    return DenunciaCurriculo
}