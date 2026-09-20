import React from 'react';
import { Store } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <Store className="mx-auto text-emerald-600 mb-2" size={48} />
          <h2 className="text-2xl font-bold text-gray-800">Bienvenido de nuevo</h2>
          <p className="text-gray-500">Ingresa a tu cuenta para continuar</p>
        </div>
        <div className="space-y-4">
          <input type="email" placeholder="Correo electrónico" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          <input type="password" placeholder="Contraseña" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          <button className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition">Iniciar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default Login;