import React, { useState, useEffect } from 'react';
import { ShoppingCart, CheckCircle } from 'lucide-react';

const Catalogo = ({ carrito, setCarrito, isCartOpen, searchTerm }) => {
  const [productos, setProductos] = useState([]);
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  const agregarAlCarrito = (prod) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === prod.id);
      if (existe) return prev.map(item => item.id === prod.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      return [...prev, { ...prod, cantidad: 1 }];
    });
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const finalizarCompra = async () => {
    if (carrito.length === 0) return;
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Debes iniciar sesión para realizar una compra.');
      return;
    }

    const itemsFormateados = carrito.map(item => ({ productoId: item.id, cantidad: item.cantidad, precio: item.precio }));

    try {
      const response = await fetch('http://localhost:3000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ items: itemsFormateados, total: totalCarrito })
      });

      if (response.ok) {
        setMensajeExito('¡Compra exitosa!');
        setCarrito([]);
        setTimeout(() => window.location.reload(), 2000); 
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Lógica del buscador (Case Insensitive)
  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto mt-8 p-4 flex gap-8 transition-all duration-300">
      
      {/* Catálogo dinámico: Si el carrito está abierto ocupa menos espacio, si está cerrado ocupa todo */}
      <div className={`transition-all duration-500 ${isCartOpen ? 'w-full lg:w-2/3' : 'w-full'}`}>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Catálogo Disponible</h2>
        
        {mensajeExito && (
          <div className="mb-6 bg-emerald-100 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <CheckCircle size={24} /> <span>{mensajeExito}</span>
          </div>
        )}

        <div className={`grid gap-6 ${isCartOpen ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-4'}`}>
          {productosFiltrados.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-10">No se encontraron productos.</p>
          ) : (
            productosFiltrados.map(prod => (
              <div key={prod.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col group">
                <div className="relative h-48 p-4 flex justify-center items-center bg-gray-50">
                  <img src={prod.imagen} alt={prod.nombre} className="max-h-full object-contain group-hover:scale-105 transition-transform" />
                  {prod.stock < 20 && prod.stock > 0 && <span className="absolute top-3 left-3 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">¡Quedan {prod.stock}!</span>}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-semibold text-gray-700 mb-2">{prod.nombre}</h3>
                  <div className="mt-auto">
                    <p className="text-emerald-600 font-black text-xl mb-4">${prod.precio}</p>
                    <button 
                      onClick={() => agregarAlCarrito(prod)}
                      className="w-full bg-emerald-600 text-white py-2 rounded-xl font-bold hover:bg-emerald-700 disabled:bg-gray-300"
                      disabled={prod.stock === 0}
                    >
                      {prod.stock === 0 ? 'Agotado' : 'Agregar'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Carrito Lateral (Condicional) */}
      {isCartOpen && (
        <div className="hidden lg:block w-1/3 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 h-fit sticky top-24 transition-all animate-fade-in">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ShoppingCart className="text-emerald-600" /> Tu Carrito
          </h3>
          {carrito.length === 0 ? (
            <p className="text-gray-400 text-center py-10">Tu carrito está vacío</p>
          ) : (
            <div className="space-y-4">
              <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-2">
                {carrito.map(item => (
                  <div key={item.id} className="py-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-800">{item.nombre}</h4>
                      <p className="text-xs text-gray-500">Cant: {item.cantidad} x ${item.precio}</p>
                    </div>
                    <span className="font-bold text-emerald-600">${item.precio * item.cantidad}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-black text-gray-900 mb-4">
                  <span>Total:</span> <span className="text-emerald-600">${totalCarrito}</span>
                </div>
                <button onClick={finalizarCompra} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">
                  Confirmar y Pagar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Catalogo;