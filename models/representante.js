'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Representante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Dependencia, { foreignKey: 'idDependencia' })
    }
  }
  Representante.init({
    name: DataTypes.STRING,
    hasVoto: DataTypes.BOOLEAN,
    checkedIn: DataTypes.BOOLEAN,
    checkInDate: DataTypes.DATE,
    inMeeting: DataTypes.BOOLEAN,
    leftAt: DataTypes.DATE
  }, {
    sequelize,
    timestamps: true,
    name: {
      singular: 'representante',
      plural: 'representantes'
    },
    modelName: 'Representante',
  });
  return Representante;
};