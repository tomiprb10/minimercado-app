import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [usuario, setUsuario] = useState(null);

  // Leer usuario al cargar la app
  useEffect(() => {
    const userStorage = localStorage.getItem('usuario');
    if (userStorage) {
      setUsuario(JSON.parse(userStorage));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Pasamos los props al Navbar */}
        <Navbar usuario={usuario} cerrarSesion={cerrarSesion} />
        
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;