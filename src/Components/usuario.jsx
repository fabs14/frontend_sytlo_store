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
    <div className="bg-gray-50 min-h-screen p-8 font-sans">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Gestión de Usuarios</h2>

      <div className="mb-4 flex justify-center items-center">
        <input
          type="text"
          value={newUsuario.nombre}
          onChange={(e) => setNewUsuario({ ...newUsuario, nombre: e.target.value })}
          placeholder="Nombre"
          className="p-2 border border-gray-400 rounded-l-lg focus:outline-none focus:border-gray-600"
        />
        <input
          type="text"
          value={newUsuario.apellido}
          onChange={(e) => setNewUsuario({ ...newUsuario, apellido: e.target.value })}
          placeholder="Apellido"
          className="p-2 border border-gray-400 focus:outline-none focus:border-gray-600 mx-2"
        />
        <input
          type="email"
          value={newUsuario.email}
          onChange={(e) => setNewUsuario({ ...newUsuario, email: e.target.value })}
          placeholder="Email"
          className="p-2 border border-gray-400 focus:outline-none focus:border-gray-600 mx-2"
        />
        <input
          type="password"
          value={newUsuario.password}
          onChange={(e) => setNewUsuario({ ...newUsuario, password: e.target.value })}
          placeholder="Password"
          className="p-2 border border-gray-400 focus:outline-none focus:border-gray-600 mx-2"
        />
        <select
          value={newUsuario.rol}
          onChange={(e) => setNewUsuario({ ...newUsuario, rol: e.target.value })}
          className="p-2 border border-gray-400 focus:outline-none focus:border-gray-600"
        >
          {roles.map((rol) => (
            <option key={rol} value={rol}>
              {rol}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddUsuario}
          className="bg-green-500 text-white px-4 py-2 ml-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Agregar Usuario
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Nombre</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Apellido</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Email</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Rol</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-t">
                <td className="py-3 px-4">
                  {editUsuarioId === usuario.id ? (
                    <input
                      type="text"
                      value={editUsuario.nombre}
                      onChange={(e) => setEditUsuario({ ...editUsuario, nombre: e.target.value })}
                      className="p-2 border rounded-lg border-gray-400 focus:outline-none focus:border-gray-600"
                    />
                  ) : (
                    usuario.nombre
                  )}
                </td>
                <td className="py-3 px-4">
                  {editUsuarioId === usuario.id ? (
                    <input
                      type="text"
                      value={editUsuario.apellido}
                      onChange={(e) => setEditUsuario({ ...editUsuario, apellido: e.target.value })}
                      className="p-2 border rounded-lg border-gray-400 focus:outline-none focus:border-gray-600"
                    />
                  ) : (
                    usuario.apellido
                  )}
                </td>
                <td className="py-3 px-4">
                  {editUsuarioId === usuario.id ? (
                    <input
                      type="email"
                      value={editUsuario.email}
                      onChange={(e) => setEditUsuario({ ...editUsuario, email: e.target.value })}
                      className="p-2 border rounded-lg border-gray-400 focus:outline-none focus:border-gray-600"
                    />
                  ) : (
                    usuario.email
                  )}
                </td>
                <td className="py-3 px-4">
                  {editUsuarioId === usuario.id ? (
                    <select
                      value={editUsuario.rol}
                      onChange={(e) => setEditUsuario({ ...editUsuario, rol: e.target.value })}
                      className="p-2 border rounded-lg border-gray-400 focus:outline-none focus:border-gray-600"
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
                <td className="py-3 px-4">
                  {editUsuarioId === usuario.id ? (
                    <button
                      onClick={handleSaveEdit}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300 mr-2"
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditUsuario(usuario.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-300 mr-2"
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteUsuario(usuario.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Eliminar
                  </button>
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
