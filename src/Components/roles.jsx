import React, { useState } from 'react';

const Roles = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Cliente' },
    { id: 3, name: 'Delivery' }
  ]);
  const [newRole, setNewRole] = useState('');
  const [editRoleId, setEditRoleId] = useState(null);
  const [editRoleName, setEditRoleName] = useState('');

  const handleAddRole = () => {
    if (newRole.trim()) {
      setRoles([...roles, { id: roles.length + 1, name: newRole }]);
      setNewRole('');
    }
  };

  const handleEditRole = (id) => {
    const roleToEdit = roles.find((role) => role.id === id);
    setEditRoleId(id);
    setEditRoleName(roleToEdit.name);
  };

  const handleSaveEdit = () => {
    setRoles(roles.map((role) => (role.id === editRoleId ? { ...role, name: editRoleName } : role)));
    setEditRoleId(null);
    setEditRoleName('');
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div className="bg-pink-50 min-h-screen p-8 font-sans">
      <h2 className="text-4xl font-bold text-center text-pink-600 mb-10">Gestión de Roles</h2>

      {/* Formulario para agregar rol */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-pink-600 mb-4">Agregar Nuevo Rol</h3>
        <div className="flex justify-center">
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="Nuevo Rol"
            className="p-3 rounded-l-lg border border-pink-300 focus:outline-none focus:ring-pink-400 focus:border-pink-500"
          />
          <button
            onClick={handleAddRole}
            className="bg-pink-500 text-white px-4 py-3 rounded-r-lg hover:bg-pink-600 transition duration-300"
          >
            Agregar Rol
          </button>
        </div>
      </div>

      {/* Tabla de roles */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-pink-200">
          <thead className="bg-pink-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Nombre del Rol</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-pink-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-pink-200">
            {roles.length > 0 ? (
              roles.map((role) => (
                <tr key={role.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-900">{role.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-900">
                    {editRoleId === role.id ? (
                      <input
                        type="text"
                        value={editRoleName}
                        onChange={(e) => setEditRoleName(e.target.value)}
                        className="p-2 border border-pink-300 rounded-lg focus:outline-none focus:border-pink-500"
                      />
                    ) : (
                      role.name
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editRoleId === role.id ? (
                      <button
                        onClick={handleSaveEdit}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                      >
                        Guardar
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditRole(role.id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition ml-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition ml-2"
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-pink-500">No hay roles registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Roles;
