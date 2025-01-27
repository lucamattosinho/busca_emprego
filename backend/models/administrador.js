'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Administrador extends Model {
        static associate(models) {
            // nao sei ainda
        }
    }
    Administrador.init(
        {
            nome: DataTypes.STRING(100),
            email: DataTypes.STRING(80),
            senha: DataTypes.STRING(22)
        },
        {
            sequelize,
            modelName: 'Administradores'
        }
    )
    return Administrador
}