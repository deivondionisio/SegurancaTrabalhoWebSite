const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(/* informação de conexão */);

class Requisicoes extends Model {}

Requisicoes.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    defaultValue: sequelize.literal('nextval(requisicoes_id_seq::regclass)')
  },
  usuario_id: {
    type: DataTypes.NUMERIC(9,0),
    allowNull: false
  },
  usuario_solicitante_id: {
   type: DataTypes.CHAR(255),
   allowNull:false
  },

}, {
 tableName:'requisicoes',
 sequelize,
});

module.exports = Requisicoes;
