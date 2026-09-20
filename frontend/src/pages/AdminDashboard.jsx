import React, { useState, useEffect } from 'react';
import { Trash2, PlusCircle, Package } from 'lucide-react';

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', precio: '', stock: '', imagen: '' });

  const fetchProductos = () => {
    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data));
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch('http://localhost:3000/api/productos', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ nombre: '', precio: '', stock: '', imagen: '' });
        fetchProductos();
      } else {
        alert('Error al crear producto (¿Eres admin?)');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:3000/api/productos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchProductos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
        <Package className="text-emerald-600" /> Panel de Administración
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario para agregar producto */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 h-fit">
          <h3 className="text-xl font-bold mb-4">Agregar Nuevo Producto</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="nombre" placeholder="Nombre del producto" required value={formData.nombre} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-200" />
            <input type="number" name="precio" placeholder="Precio" required value={formData.precio} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-200" />
            <input type="number" name="stock" placeholder="Stock inicial" required value={formData.stock} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-200" />
            <input type="url" name="imagen" placeholder="URL de la imagen" required value={formData.imagen} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-200" />
            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 flex justify-center items-center gap-2">
              <PlusCircle size={20} /> Guardar Producto
            </button>
          </form>
        </div>

        {/* Tabla de inventario */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md border border-gray-100 overflow-x-auto">
          <h3 className="text-xl font-bold mb-4">Inventario Actual</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Producto</th>
                <th className="p-3 border-b">Precio</th>
                <th className="p-3 border-b">Stock</th>
                <th className="p-3 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(prod => (
                <tr key={prod.id} className="hover:bg-gray-50 border-b border-gray-100">
                  <td className="p-3">{prod.id}</td>
                  <td className="p-3 font-semibold">{prod.nombre}</td>
                  <td className="p-3 text-emerald-600">${prod.precio}</td>
                  <td className="p-3">{prod.stock}</td>
                  <td className="p-3">
                    <button onClick={() => eliminarProducto(prod.id)} className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;