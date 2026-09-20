const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const router = express.Router();

// CLAVE SECRETA (En producción iría en un archivo .env)
const SECRET_KEY = 'minimercado_sena_secreto';

// Endpoint de Registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    
    // Verificar si el usuario ya existe
    const existeUsuario = await Usuario.findOne({ where: { email } });
    if (existeUsuario) return res.status(400).json({ error: 'El correo ya está registrado' });

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear usuario en BD
    await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      rol: 'cliente' // Por defecto, todos los que se registran son clientes
    });

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Endpoint de Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Generar Token JWT
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol }, 
      SECRET_KEY, 
      { expiresIn: '2h' }
    );

    res.json({ 
      mensaje: 'Login exitoso', 
      token, 
      usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;