const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const PedidoItem = require('../models/PedidoItem');
const Producto = require('../models/Producto');
const verificarToken = require('../middleware/authMiddleware');

// GET: Obtener historial de pedidos del usuario logueado
router.get('/mis-pedidos', verificarToken, async (req, res) => {
  try {
    const historial = await Pedido.findAll({
      where: { UsuarioId: req.usuario.id },
      order: [['createdAt', 'DESC']] // Ordenar del más reciente al más antiguo
    });
    res.json(historial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el historial de pedidos' });
  }
});
// La ruta ahora exige 'verificarToken' antes de ejecutar la compra
router.post('/', verificarToken, async (req, res) => {
  try {
    const { items, total } = req.body;
    const usuarioId = req.usuario.id; // Extraído de forma segura desde el JWT

    const nuevoPedido = await Pedido.create({
      total,
      UsuarioId: usuarioId 
    });

    for (const item of items) {
      await PedidoItem.create({
        PedidoId: nuevoPedido.id,
        ProductoId: item.productoId,
        cantidad: item.cantidad,
        precio_unitario: item.precio
      });

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