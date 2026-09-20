const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Pedido = require('./Pedido');
const Producto = require('./Producto');

const PedidoItem = sequelize.define('PedidoItem', {
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  precio_unitario: { type: DataTypes.FLOAT, allowNull: false }
});

// Relaciones
Pedido.hasMany(PedidoItem);
PedidoItem.belongsTo(Pedido);

Producto.hasMany(PedidoItem);
PedidoItem.belongsTo(Producto);

module.exports = PedidoItem;