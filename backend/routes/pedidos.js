const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const PedidoItem = require('../models/PedidoItem');
const Producto = require('../models/Producto');

// Ruta para crear un nuevo pedido
router.post('/', async (req, res) => {
  try {
    const { UsuarioId, items, total } = req.body; // items es un array con [{ productoId, cantidad, precio }]

    // 1. Crear el pedido principal
    const nuevoPedido = await Pedido.create({
      total,
      UsuarioId: UsuarioId || 1 // Por defecto asignamos el usuario 1 si no hay sesión estricta aún
    });

    // 2. Crear los ítems asociados y descontar el stock
    for (const item of items) {
      await PedidoItem.create({
        PedidoId: nuevoPedido.id,
        ProductoId: item.productoId,
        cantidad: item.cantidad,
        precio_unitario: item.precio
      });

      // Actualizar el stock del producto
      const producto = await Producto.findByPk(item.productoId);
      if (producto) {
        producto.stock -= item.cantidad;
        await producto.save();
      }
    }

    res.status(201).json({ mensaje: '¡Pedido creado con éxito!', pedidoId: nuevoPedido.id });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ error: 'Hubo un error al procesar la compra' });
  }
});

module.exports = router;