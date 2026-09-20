const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
const verificarToken = require('../middleware/authMiddleware');
const verificarAdmin = require('../middleware/adminMiddleware');

// GET: Público (Cualquiera puede ver el catálogo)
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// POST: Solo Admin (Crear producto)
router.post('/', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const { nombre, precio, stock, imagen } = req.body;
    const nuevoProducto = await Producto.create({ nombre, precio, stock, imagen });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// DELETE: Solo Admin (Eliminar producto)
router.delete('/:id', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await Producto.destroy({ where: { id } });
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// PUT: Solo Admin (Editar producto)
router.put('/:id', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock, imagen } = req.body;
    
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    await producto.update({ nombre, precio, stock, imagen });
    res.json({ mensaje: 'Producto actualizado exitosamente', producto });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

module.exports = router;