const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

class MateriaisRequisicao extends Model {}

MateriaisRequisicao.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    requisicao_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    material_id: {
        type: DataTypes.CHAR(60),
        allowNull: false
    },
    quantidade_requisitada: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    status:{
      type :DataTypes.CHAR(5),
      allowNull:false 
   }
}, {
  sequelize, 
  modelName:'MateriaisRequisicao',
  tableName:'materiais_requisicao',
  timestamps:false 
});

module.exports = MateriaisRequisicao;
