'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class DenunciaEmpresa extends Model {
        static associate(models) {
            DenunciaEmpresa.belongsTo(models.Empresa, {
                foreignKey: 'empresaId'
            })
        }
    }
    DenunciaEmpresa.init(
        {
        descricao: DataTypes.STRING(300),
        status: DataTypes.STRING(20)
        },
        {
        sequelize,
        modelName: 'DenunciaEmpresa'
        }
    )
    return DenunciaEmpresa
}