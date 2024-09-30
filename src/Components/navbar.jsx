import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Usar el contexto de autenticación

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Obtener el estado de autenticación y la función logout

  return (
    <nav className="bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-yellow-300">Stylo Store</Link>
        </div>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/usuarios" className="hover:text-yellow-300">Usuarios</Link>
              <Link to="/roles" className="hover:text-yellow-300">Roles</Link>
              <Link to="/permisos" className="hover:text-yellow-300">Permisos</Link>
              <Link to="/productos" className="hover:text-yellow-300">Productos</Link>
              <Link to="/categorias" className="hover:text-yellow-300">Categorías</Link>
              <Link to="/inventario" className="hover:text-yellow-300">Inventario</Link>
              <Link to="/metodospago" className="hover:text-yellow-300">Métodos de Pago</Link>
              <Link to="/sucursal" className="hover:text-yellow-300">Sucursales</Link>
              <Link to="/talla" className="hover:text-yellow-300">Tallas</Link>
              <Link to="/delivery" className="hover:text-yellow-300">Delivery</Link>
              <Link to="/direccion" className="hover:text-yellow-300">Direcciones de Entrega</Link>
              <button
                onClick={logout} 
                className="hover:text-red-500">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-yellow-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
