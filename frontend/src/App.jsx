import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import MisPedidos from './pages/MisPedidos';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Inicializar carrito desde localStorage
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    const userStorage = localStorage.getItem('usuario');
    if (userStorage) setUsuario(JSON.parse(userStorage));
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          usuario={usuario} 
          cerrarSesion={cerrarSesion} 
          carritoCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Routes>
          <Route path="/" element={<Catalogo carrito={carrito} setCarrito={setCarrito} isCartOpen={isCartOpen} searchTerm={searchTerm} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/mis-pedidos" element={<MisPedidos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;