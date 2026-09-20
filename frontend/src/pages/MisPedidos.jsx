import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/api/pedidos/mis-pedidos', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setPedidos(data));
    }
  }, []);

  return (
    <div className="container mx-auto mt-8 p-4 max-w-4xl">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
        <FileText className="text-emerald-600" /> Mi Historial de Pedidos
      </h2>

      {pedidos.length === 0 ? (
        <p className="text-gray-500 bg-white p-8 rounded-2xl text-center shadow-sm">Aún no has realizado ninguna compra.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-emerald-50 text-emerald-800">
              <tr>
                <th className="p-4">Pedido #</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Total Pagado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pedidos.map(pedido => (
                <tr key={pedido.id} className="hover:bg-gray-50">
                  <td className="p-4 font-bold">#{pedido.id}</td>
                  <td className="p-4 text-gray-600">{new Date(pedido.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-emerald-600 font-bold">${pedido.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MisPedidos;