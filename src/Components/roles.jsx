import React, { useState, useEffect } from 'react';
import axios from './api';

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [formState, setFormState] = useState({ nombre: '' });
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        const response = await axios.get('/roles');
        setRoles(response.data);
    }

    const validateForm = () => {
        const newErrors = {};
        if (!formState.nombre) newErrors.nombre = 'Nombre es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormState({ ...formState, [id]: value });
    };

    const resetForm = () => {
        setFormState({ nombre: '' });
        setErrors({});
        setEditId(null);
    };

    const createOrUpdateRol = async () => {
        if (validateForm()) {
            if (editId) {
                await axios.put(`/roles/${editId}`, formState);
            } else {
                await axios.post('/roles', formState);
            }
            fetchRoles();
            resetForm();
        }
    };

    const deleteRol = async (id) => {
        await axios.delete(`/roles/${id}`);
        fetchRoles();
    }

    return (
        <div className="min-h-screen bg-pink-50 p-8">
     

            <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Gestión de Roles</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">{editId ? 'Editar Rol' : 'Crear Nuevo Rol'}</h3>
                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Nombre del Rol:</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Ingresar el nombre del rol"
                        value={formState.nombre}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    />
                    {errors.nombre && <p className="text-red-500 mt-2">{errors.nombre}</p>}
                </div>
                <button
                    onClick={createOrUpdateRol}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
                >
                    {editId ? 'Actualizar Rol' : 'Crear Rol'}
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">Lista de Roles</h3>
                <table className="min-w-full bg-white border border-pink-200 rounded-lg overflow-hidden">
                    <thead className="bg-pink-100 text-pink-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
                            <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-200">
                        {roles.map((rol) => (
                            <tr key={rol.id}>
                                <td className="py-4 px-6 text-pink-900">{rol.nombre}</td>
                                <td className="py-4 px-6 text-right">
                                    <button
                                        onClick={() => {
                                            setEditId(rol.id);
                                            setFormState({ nombre: rol.nombre });
                                        }}
                                        className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition ml-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deleteRol(rol.id)}
                                        className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition ml-2"
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
}

export default Roles;
