import React, { useState } from 'react';

const PermisosCrud = () => {
  const roles = ['Administrador', 'Cliente', 'Delivery'];
  const permisos = [
    'Ver Usuarios', 'Crear Usuario', 'Editar Usuario', 'Eliminar Usuario',
    'Ver Categorías', 'Crear Categoría', 'Editar Categoría', 'Eliminar Categoría',
    'Ver Productos', 'Crear Productos', 'Editar Productos', 'Eliminar Productos'
  ];

  // Permisos iniciales para Administrador
  const initialPermisos = [
    { rol: 'Administrador', permiso: 'Ver Usuarios' },
    { rol: 'Administrador', permiso: 'Crear Usuario' },
    { rol: 'Administrador', permiso: 'Editar Usuario' },
    { rol: 'Administrador', permiso: 'Eliminar Usuario' },
    { rol: 'Administrador', permiso: 'Ver Categorías' },
    { rol: 'Administrador', permiso: 'Crear Categoría' },
    { rol: 'Administrador', permiso: 'Editar Categoría' },
    { rol: 'Administrador', permiso: 'Eliminar Categoría' },
    { rol: 'Administrador', permiso: 'Ver Productos' },
    { rol: 'Administrador', permiso: 'Crear Productos' },
    { rol: 'Administrador', permiso: 'Editar Productos' },
    { rol: 'Administrador', permiso: 'Eliminar Productos' }
  ];

  const [rolPermisos, setRolPermisos] = useState(initialPermisos);
  const [formState, setFormState] = useState({ rol: '', permiso: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleAddPermiso = () => {
    if (formState.rol && formState.permiso) {
      setRolPermisos([...rolPermisos, { rol: formState.rol, permiso: formState.permiso }]);
      setFormState({ rol: '', permiso: '' });
    }
  };

  const handleDeletePermiso = (index) => {
    const updatedPermisos = rolPermisos.filter((_, i) => i !== index);
    setRolPermisos(updatedPermisos);
  };

  return (
    <div className="bg-pink-50 min-h-screen p-8 font-sans">
      <h2 className="text-4xl font-bold text-center text-pink-600 mb-10">Gestión de Permisos de Roles</h2>

      {/* Formulario para asignar permisos */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-pink-600 mb-4">Asignar Permiso a Rol</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="rol" className="block mb-2 text-pink-700 font-medium">Rol</label>
            <select
              id="rol"
              name="rol"
              value={formState.rol}
              onChange={handleInputChange}
              className="block w-full p-3 border border-pink-300 rounded-lg shadow-sm focus:outline-none focus:ring-pink-400 focus:border-pink-500"
            >
              <option value="">Seleccionar Rol</option>
              {roles.map((rol, index) => (
                <option key={index} value={rol}>{rol}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="permiso" className="block mb-2 text-pink-700 font-medium">Permiso</label>
            <select
              id="permiso"
              name="permiso"
              value={formState.permiso}
              onChange={handleInputChange}
              className="block w-full p-3 border border-pink-300 rounded-lg shadow-sm focus:outline-none focus:ring-pink-400 focus:border-pink-500"
            >
              <option value="">Seleccionar Permiso</option>
              {permisos.map((permiso, index) => (
                <option key={index} value={permiso}>{permiso}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAddPermiso}
            className="bg-pink-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
          >
            Asignar
          </button>
        </div>
      </div>

      {/* Tabla de permisos asignados */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-pink-200">
          <thead className="bg-pink-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">Permiso</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-pink-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-pink-200">
            {rolPermisos.length > 0 ? (
              rolPermisos.map((rp, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-900">{rp.rol}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-900">{rp.permiso}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeletePermiso(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-pink-500">No hay permisos asignados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermisosCrud;
                                                                                                              



























































































































































































































































































































































































































