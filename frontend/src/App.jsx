import React, { useState, useEffect } from 'react';

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Petición al backend local
    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-green-600 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🛒 Minimercado Express</h1>
          <button className="bg-white text-green-600 px-4 py-2 rounded font-semibold hover:bg-gray-100">
            Iniciar Sesión
          </button>
        </div>
      </nav>

      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Catálogo de Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productos.length === 0 ? (
            <p className="text-gray-500 text-center col-span-3">Cargando inventario...</p>
          ) : (
            productos.map(prod => (
              <div key={prod.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={prod.imagen} 
                  alt={prod.nombre} 
                  className="h-48 w-full object-cover rounded mb-4 border border-gray-200" 
                />
                <h3 className="font-bold text-lg text-gray-800">{prod.nombre}</h3>
                
                <div className="flex justify-between items-center mt-2">
                  <p className="text-green-600 font-bold text-xl">${prod.precio}</p>
                  <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded">
                    Stock: {prod.stock}
                  </span>
                </div>

                <button 
                  className="mt-5 w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                  disabled={prod.stock === 0}
                >
                  {prod.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;