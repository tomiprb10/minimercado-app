import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Store, LogOut, FileText } from 'lucide-react';

const Navbar = ({ usuario, cerrarSesion, carritoCount, isCartOpen, setIsCartOpen, searchTerm, setSearchTerm }) => {
  const location = useLocation();
  const esLogin = location.pathname === '/login';

  return (
    <nav className="bg-emerald-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter">
          <Store size={32} />
          <span className="hidden sm:inline">Minimercado</span>
        </Link>

        {/* Buscador: Solo visible si NO es login */}
        {!esLogin && (
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Buscar abarrotes, lácteos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-gray-800 rounded-full py-2.5 px-5 focus:outline-none focus:ring-2 focus:ring-emerald-300 shadow-inner" 
              />
              <Search className="absolute right-4 top-3 text-gray-400" size={20} />
            </div>
          </div>
        )}

        {/* Menú Usuario y Carrito */}
        <div className="flex items-center gap-4 sm:gap-6">
          {usuario ? (
            <div className="flex items-center gap-4">
              {usuario.rol === 'admin' && (
                <Link to="/admin" className="text-sm bg-emerald-800 px-3 py-1 rounded-full font-bold shadow-inner hover:bg-emerald-900 transition">
                  Panel Admin
                </Link>
              )}
              <div className="flex items-center gap-2 font-medium hidden lg:flex">
                <span>Hola, {usuario.nombre}</span>
                <Link to="/mis-pedidos" className="hover:text-emerald-200 transition" title="Mis Pedidos">
                  <FileText size={18} />
                </Link>
              </div>
              <button onClick={cerrarSesion} className="flex items-center gap-1 hover:text-red-200 transition" title="Cerrar sesión">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 hover:text-emerald-200 transition font-medium">
              <User size={24} />
              <span className="hidden lg:inline">Mi Cuenta</span>
            </Link>
          )}
          
          {/* Carrito Toggle: Solo visible si NO es login */}
          {!esLogin && (
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition border ${isCartOpen ? 'bg-emerald-800 border-emerald-400' : 'bg-emerald-800/50 hover:bg-emerald-800 border-emerald-500/30'}`}
            >
              <ShoppingCart size={22} />
              <span className="hidden sm:inline font-semibold">Carrito</span>
              {carritoCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md border-2 border-emerald-600">
                  {carritoCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;