import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-yellow-300">Stylo Store</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/login" className="hover:text-yellow-300">Login</Link>
          <Link to="/usuarios" className="hover:text-yellow-300">Usuarios</Link>
          <Link to="/roles" className="hover:text-yellow-300">Roles</Link>
          <Link to="/permisos" className="hover:text-yellow-300">Permisos</Link>
          <Link to="/productos" className="hover:text-yellow-300">Productos</Link>
          <Link to="/categorias" className="hover:text-yellow-300">Categorías</Link>
          <Link to="/inventario" className="hover:text-yellow-300">Inventarios</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
