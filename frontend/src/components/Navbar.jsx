import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Store, LogOut } from 'lucide-react';

const Navbar = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStorage = localStorage.getItem('usuario');
    if (userStorage) setUsuario(JSON.parse(userStorage));
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-emerald-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter">
          <Store size={32} />
          <span className="hidden sm:inline">Minimercado</span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <input type="text" placeholder="Buscar abarrotes..." className="w-full text-gray-800 rounded-full py-2.5 px-5 focus:outline-none shadow-inner" />
            <Search className="absolute right-4 top-3 text-gray-400" size={20} />
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {usuario ? (
            <div className="flex items-center gap-4">
              <span className="font-medium hidden lg:inline">Hola, {usuario.nombre}</span>
              <button onClick={cerrarSesion} className="flex items-center gap-1 hover:text-red-200 transition">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 hover:text-emerald-200 transition font-medium">
              <User size={24} />
              <span className="hidden lg:inline">Iniciar Sesión</span>
            </Link>
          )}
          
          <button className="relative flex items-center gap-2 bg-emerald-800/50 hover:bg-emerald-800 px-4 py-2 rounded-full transition">
            <ShoppingCart size={22} />
            <span className="hidden sm:inline font-semibold">Carrito</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;