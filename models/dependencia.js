'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dependencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Representante, { foreignKey: 'idDependencia' })
    }
  }
  Dependencia.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    name: {
      singular: 'dependencia',
      plural: 'dependencias'
    },
    tableName: 'Dependencias',
    modelName: 'Dependencia',
  });
  return Dependencia;
};