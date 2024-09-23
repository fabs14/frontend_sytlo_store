import React, { useState } from 'react';

const UsuariosCrud = () => {
  const roles = ['Administrador', 'Cliente', 'Delivery'];

  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Jorge', apellido: 'Perez', email: 'jorge@example.com', rol: 'Administrador', password: '12345' },
    { id: 2, nombre: 'Maria', apellido: 'Lopez', email: 'maria@example.com', rol: 'Cliente', password: 'abcde' },
    { id: 3, nombre: 'Carlos', apellido: 'Gomez', email: 'carlos@example.com', rol: 'Delivery', password: 'xyz123' }
  ]);

  const [newUsuario, setNewUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    rol: roles[0],
    password: ''
  });
  const [editUsuarioId, setEditUsuarioId] = useState(null);
  const [editUsuario, setEditUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  });

  const handleAddUsuario = () => {
    if (newUsuario.nombre.trim() && newUsuario.email.trim() && newUsuario.password.trim()) {
      setUsuarios([...usuarios, { id: usuarios.length + 1, ...newUsuario }]);
      setNewUsuario({
        nombre: '',
        apellido: '',
        email: '',
        rol: roles[0],
        password: ''
      });
    }
  };

  const handleEditUsuario = (id) => {
    const usuarioToEdit = usuarios.find((usuario) => usuario.id === id);
    setEditUsuarioId(id);
    setEditUsuario(usuarioToEdit);
  };

  const handleSaveEdit = () => {
    setUsuarios(
      usuarios.map((usuario) =>
        usuario.id === editUsuarioId ? { ...usuario, ...editUsuario } : usuario
      )
    );
    setEditUsuarioId(null);
    setEditUsuario({
      nombre: '',
      apellido: '',
      email: '',
      rol: '',
      password: ''
    });
  };

  const handleDeleteUsuario = (id) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  return (
    <div className="bg-pink-50 min-h-screen p-8 font-sans">
      <h2 className="text-4xl font-bold text-center text-pink-600 mb-10">Gestión de Usuarios</h2>

      {/* Formulario para agregar usuario */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-pink-600 mb-4">Agregar Nuevo Usuario</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <input
            type="text"
            value={newUsuario.nombre}
            onChange={(e) => setNewUsuario({ ...newUsuario, nombre: e.target.value })}
            placeholder="Nombre"
            className="p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-pink-400 focus:border-pink-500"
          />
          <input
            type="text"
            value={newUsuario.apellido}
            onChange={(e) => setNewUsuario({ ...newUsuario, apellido: e.target.value })}
            placeholder="Apellido"
            className="p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-pink-400 focus:border-pink-500"
          />
          <input
            type="email"
            value={newUsuario.email}
            onChange={(e) => setNewUsuario({ ...newUsuario, email: e.target.value })}
            placeholder="Email"
            className="p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-pink-400 focus:border-pink-500"
          />
          <input
            type="password"
            value={newUsuario.password}
            onChange={(e) => setNewUsuario({ ...newUsuario, password: e.target.value })}
            placeholder="Password"
            className="p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-pink-400 focus:border-pink-500"
          />
          <select
            value={newUsuario.rol}
            onChange={(e) => setNewUsuario({ ...newUsuario, rol: e.target.value })}
            className="p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-pink-400 focus:border-pink-500"
          >
            {roles.map((rol) => (
              <option key={rol} value={rol}>
                {rol}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddUsuario}
            className="bg-pink-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
          >
            Agregar Usuario
          </button>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-pink-200">
          <thead className="bg-pink-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Apellido</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-pink-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-pink-200">
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-900">
                  {editUsuarioId === usuario.id ? (
                    <input
                      type="text"
                      value={editUsuario.nombre}
                      onChange={(e) => setEditUsuario({ ...editUsuario, nombre: e.target.value })}
                      className="p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-pink-400 focus:border-pink-500"
                    />
                  ) : (
                    usuario.nombre
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-900">
                  {editUsuarioId === usuario.id ? (
                    <input
                      type="text"
                      value={editUsuario.apellido}
                      onChange={(e) => setEditUsuario({ ...editUsuario, apellido: e.target.value })}
                      className="p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-pink-400 focus:border-pink-500"
                    />
                  ) : (
                    usuario.apellido
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-900">
                  {editUsuarioId === usuario.id ? (
                    <input
                      type="email"
                      value={editUsuario.email}
                      onChange={(e) => setEditUsuario({ ...editUsuario, email: e.target.value })}
                      className="p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-pink-400 focus:border-pink-500"
                    />
                  ) : (
                    usuario.email
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-900">
                  {editUsuarioId === usuario.id ? (
                    <select
                      value={editUsuario.rol}
                      onChange={(e) => setEditUsuario({ ...editUsuario, rol: e.target.value })}
                      className="p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-pink-400 focus:border-pink-500"
                    >
                      {roles.map((rol) => (
                        <option key={rol} value={rol}>
                          {rol}
                        </option>
                      ))}
                    </select>
                  ) : (
                    usuario.rol
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editUsuarioId === usuario.id ? (
                    <button
                      onClick={handleSaveEdit}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                    >
                      Guardar
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditUsuario(usuario.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition ml-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteUsuario(usuario.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition ml-2"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosCrud;
