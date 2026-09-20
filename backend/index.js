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

// 1. Rutas de Autenticación
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// 2. Rutas de Productos (Aquí es donde la importas y la usas limpiamente)
const productosRoutes = require('./routes/productos');
app.use('/api/productos', productosRoutes);

// 3. Rutas de Pedidos
const pedidosRoutes = require('./routes/pedidos');
app.use('/api/pedidos', pedidosRoutes);

const PORT = process.env.PORT || 3000;

// Sincronizar Sequelize y levantar el servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});