import React, { useState } from 'react';
import axios from './api';
import { useAuth } from '../AuthContext'; // Importamos el contexto
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Usamos la función de login del contexto
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`/usuarios/login`, {
        email,
        contraseña,
      });

      const token = response.data;

      if (token) {
        login(token); // Guardar el token en el contexto y localStorage
        console.log('Login exitoso, token guardado:', token);
        setError('');
        navigate('/usuarios'); // Redirigir a la página de usuarios
      } else {
        throw new Error('No se recibió el token del servidor');
      }
    } catch (err) {
      if (err.response) {
        console.error('Error del servidor:', err.response.data);
        setError(err.response.data || 'Credenciales incorrectas');
      } else if (err.request) {
        console.error('Error de red:', err.request);
        setError('Error de red. Por favor, intenta de nuevo.');
      } else {
        console.error('Error:', err.message);
        setError('Error en la solicitud');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Iniciar Sesión</h2>

        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-pink-600 font-semibold mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-pink-600 font-semibold mb-1">Contraseña:</label>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-lg shadow-md transition duration-300 ${
              loading
                ? 'bg-pink-300 cursor-not-allowed'
                : 'bg-pink-500 hover:bg-pink-600'
            }`}
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
