// backend/index.js
const express = require('express');
const cors = require('cors'); 
const sequelize = require('./database');
const Producto = require('./models/Producto');
const Usuario = require('./models/Usuario');
const Pedido = require('./models/Pedido');
const PedidoItem = require('./models/PedidoItem');

const app = express();

app.use(cors()); 
app.use(express.json());

// Ruta para obtener los productos
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

const PORT = process.env.PORT || 3000;

// Sincronizar Sequelize y levantar el servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});