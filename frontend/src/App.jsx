import React from 'react';

function App() {
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
        <h2 className="text-xl font-semibold mb-4">Catálogo de Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Aquí mapearemos los productos del Backend más adelante */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="bg-gray-300 h-32 w-full rounded mb-4"></div>
            <h3 className="font-bold text-lg">Producto de ejemplo</h3>
            <p className="text-green-600 font-bold mt-2">$0.00</p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Añadir al carrito
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;