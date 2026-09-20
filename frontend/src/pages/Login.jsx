import React, { useState } from 'react';
import { Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [esRegistro, setEsRegistro] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const url = esRegistro 
      ? 'http://localhost:3000/api/auth/register' 
      : 'http://localhost:3000/api/auth/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      if (esRegistro) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        setEsRegistro(false);
        setFormData({ nombre: '', email: '', password: '' });
      } else {
        // Guardar token y datos del usuario
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        navigate('/'); // Redirigir al catálogo
        window.location.reload(); // Recargar para actualizar el Navbar
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <Store className="mx-auto text-emerald-600 mb-2" size={48} />
          <h2 className="text-2xl font-bold text-gray-800">
            {esRegistro ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}
          </h2>
          <p className="text-gray-500">
            {esRegistro ? 'Únete a Minimercado Express' : 'Ingresa a tu cuenta para continuar'}
          </p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {esRegistro && (
            <input 
              type="text" name="nombre" placeholder="Nombre completo" required
              value={formData.nombre} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none" 
            />
          )}
          <input 
            type="email" name="email" placeholder="Correo electrónico" required
            value={formData.email} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none" 
          />
          <input 
            type="password" name="password" placeholder="Contraseña" required
            value={formData.password} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none" 
          />
          <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition">
            {esRegistro ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
          <button 
            onClick={() => setEsRegistro(!esRegistro)} 
            className="ml-2 text-emerald-600 font-bold hover:underline"
          >
            {esRegistro ? 'Inicia sesión aquí' : 'Regístrate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;