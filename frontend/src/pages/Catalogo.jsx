import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  return (
    <main className="container mx-auto mt-8 p-4">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Ofertas Destacadas</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.length === 0 ? (
          <div className="col-span-full flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          productos.map(prod => (
            <div key={prod.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group">
              <div className="relative h-56 bg-gray-50 p-6 flex justify-center items-center">
                <img src={prod.imagen} alt={prod.nombre} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                {prod.stock < 20 && prod.stock > 0 && (
                  <span className="absolute top-3 left-3 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    ¡Quedan {prod.stock}!
                  </span>
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-700 text-lg leading-tight mb-2 line-clamp-2">{prod.nombre}</h3>
                <div className="mt-auto">
                  <p className="text-emerald-600 font-black text-2xl mb-4">${prod.precio}</p>
                  <button 
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:text-gray-500 flex justify-center items-center gap-2"
                    disabled={prod.stock === 0}
                  >
                    <ShoppingCart size={20} />
                    {prod.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Catalogo;