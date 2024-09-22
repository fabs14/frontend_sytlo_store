import React, { useState } from 'react';

const usuariosRegistrados = [
  { id: 1, nombre: 'Jorge', apellido: 'Perez', email: 'jorge@gmail.com', rol: 'Administrador', password: '12345' },
  { id: 2, nombre: 'Maria', apellido: 'Lopez', email: 'maria@gmail.com', rol: 'Cliente', password: 'abcde' },
  { id: 3, nombre: 'Carlos', apellido: 'Gomez', email: 'carlos@gmail.com', rol: 'Delivery', password: 'xyz123' }
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const usuario = usuariosRegistrados.find(
      (user) => user.email === email && user.password === password
    );

    if (usuario) {
      setIsLoggedIn(true);
      setCurrentUser(usuario);
      setError('');
    } else {
      setError('Email o password incorrectos');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {isLoggedIn ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">
              Bienvenido, {currentUser.nombre} {currentUser.apellido}!
            </h2>
            <p className="text-center mb-6">Rol: {currentUser.rol}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su email"
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su password"
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Iniciar Sesión
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
