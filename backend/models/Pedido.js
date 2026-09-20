const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Usuario = require('./Usuario');

const Pedido = sequelize.define('Pedido', {
  total: { type: DataTypes.FLOAT, allowNull: false },
  estado: { type: DataTypes.ENUM('pendiente', 'pagado', 'enviado'), defaultValue: 'pagado' }
});

// Relación: Un Usuario tiene muchos Pedidos
Usuario.hasMany(Pedido);
Pedido.belongsTo(Usuario);

module.exports = Pedido;