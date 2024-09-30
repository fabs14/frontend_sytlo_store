import React, { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuth();  // Usamos la función logout del contexto
  const navigate = useNavigate(); // Usamos useNavigate para redirigir al usuario

  useEffect(() => {
    logout(); // Llamamos a la función de logout cuando se carga el componente
    navigate('/login'); // Redirigimos al usuario a la página de login
  }, [logout, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Cerrando sesión...</h2>
      </div>
    </div>
  );
};

export default Logout;
