import React, { useState, useEffect } from 'react';
import { Trash2, PlusCircle, Package, Edit2, Check } from 'lucide-react';

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', precio: '', stock: '', imagen: '' });
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);

  const fetchProductos = () => {
    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data));
  };

  useEffect(() => fetchProductos(), []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const prepararEdicion = (prod) => {
    setProductoEnEdicion(prod.id);
    setFormData({ nombre: prod.nombre, precio: prod.precio, stock: prod.stock, imagen: prod.imagen });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = productoEnEdicion ? `http://localhost:3000/api/productos/${productoEnEdicion}` : 'http://localhost:3000/api/productos';
    const method = productoEnEdicion ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert(productoEnEdicion ? '¡Producto actualizado con éxito!' : '¡Producto creado!');
        setFormData({ nombre: '', precio: '', stock: '', imagen: '' });
        setProductoEnEdicion(null);
        fetchProductos();
      }
    } catch (error) { console.error(error); }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
        <Package className="text-emerald-600" /> Panel de Administración
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100 h-fit">
          <h3 className="text-xl font-bold mb-4 text-emerald-800">
            {productoEnEdicion ? 'Editar Producto' : 'Agregar Nuevo Producto'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="nombre" placeholder="Nombre" required value={formData.nombre} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-200" />
            <input type="number" name="precio" placeholder="Precio" required value={formData.precio} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-200" />
            <input type="number" name="stock" placeholder="Stock" required value={formData.stock} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-200" />
            <input type="url" name="imagen" placeholder="URL Imagen" required value={formData.imagen} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-gray-200" />
            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 flex justify-center items-center gap-2 transition">
              {productoEnEdicion ? <><Check size={20}/> Guardar Cambios</> : <><PlusCircle size={20}/> Guardar Producto</>}
            </button>
            {productoEnEdicion && (
              <button type="button" onClick={() => { setProductoEnEdicion(null); setFormData({nombre:'', precio:'', stock:'', imagen:''})}} className="w-full text-gray-500 hover:text-gray-700 font-medium py-2">
                Cancelar Edición
              </button>
            )}
          </form>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md border border-gray-100 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600"><th className="p-3">ID</th><th className="p-3">Producto</th><th className="p-3">Acciones</th></tr>
            </thead>
            <tbody>
              {productos.map(prod => (
                <tr key={prod.id} className="border-b border-gray-100">
                  <td className="p-3">{prod.id}</td><td className="p-3 font-semibold">{prod.nombre}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => prepararEdicion(prod)} className="text-blue-500 bg-blue-50 p-2 rounded-lg"><Edit2 size={18}/></button>
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