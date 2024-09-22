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
    <div className="bg-gray-50 min-h-screen p-8 font-sans">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Gestión de Roles</h2>

      <div className="mb-4 flex justify-center items-center">
        <input
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="Nuevo Rol"
          className="p-2 rounded-l-lg border border-gray-400 focus:outline-none focus:border-gray-600"
        />
        <button
          onClick={handleAddRole}
          className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition duration-300 ml-2"
        >
          Agregar Rol
        </button>
      </div>

      <ul className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden divide-y divide-gray-200">
        {roles.map((role) => (
          <li key={role.id} className="p-4">
            {editRoleId === role.id ? (
              <>
                <input
                  type="text"
                  value={editRoleName}
                  onChange={(e) => setEditRoleName(e.target.value)}
                  className="p-2 border rounded-lg border-gray-400 focus:outline-none focus:border-gray-600"
                />
                <button
                  onClick={handleSaveEdit}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300 ml-2"
                >
                  Guardar
                </button>
              </>
            ) : (
              <>
                {role.name}
                <button
                  onClick={() => handleEditRole(role.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-300 ml-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300 ml-2"
                >
                  Eliminar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Roles;
