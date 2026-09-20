const jwt = require('jsonwebtoken');
const SECRET_KEY = 'minimercado_sena_secreto';

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ error: 'Acceso denegado. Se requiere iniciar sesión.' });

  const token = authHeader.split(' ')[1]; // Formato "Bearer <token>"
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuario = decoded; // Guardamos los datos del token (id, rol) en la request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = verificarToken;