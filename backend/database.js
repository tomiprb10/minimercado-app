// backend/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('minimercado_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Conexión a MySQL exitosa.'))
  .catch(err => console.error('Error al conectar a la BD:', err));

module.exports = sequelize;