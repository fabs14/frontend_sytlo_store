import React, { useState, useEffect } from 'react';
import axios from './api'; // Instancia de Axios configurada

const Permisos = () => {
    const [permisos, setPermisos] = useState([]);
    const [formState, setFormState] = useState({ nombre: '' });
    const [editId, setEditId] = useState(null); // ID para editar el permiso
    const [errors, setErrors] = useState({});

    // Fetch inicial para obtener todos los permisos
    useEffect(() => {
        fetchPermisos();
    }, []);

    // Obtener todos los permisos desde el backend
    const fetchPermisos = async () => {
        try {
            const response = await axios.get('/permisos'); // Endpoint corregido
            setPermisos(response.data); // Asignar los permisos obtenidos al estado
        } catch (error) {
            console.error('Error al obtener los permisos:', error);
        }
    };

    // Validar el formulario antes de enviar
    const validateForm = () => {
        const newErrors = {};
        if (!formState.nombre) newErrors.nombre = 'El nombre es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar cambios en los inputs del formulario
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormState({ ...formState, [id]: value });
    };

    // Resetear el formulario después de crear o actualizar
    const resetForm = () => {
        setFormState({ nombre: '' });
        setErrors({});
        setEditId(null);
    };

    // Crear o actualizar permisos
    const createOrUpdatePermisos = async () => {
        if (validateForm()) {
            try {
                if (editId) {
                    // Actualizar un permiso existente
                    await axios.put(`/permisos/${editId}`, formState);
                } else {
                    // Crear un nuevo permiso
                    await axios.post('/permisos', formState);
                }
                fetchPermisos(); // Refrescar la lista de permisos después de la operación
                resetForm(); // Limpiar el formulario
            } catch (error) {
                console.error('Error al guardar el permiso:', error);
            }
        }
    };

    // Eliminar un permiso
    const deletePermisos = async (id) => {
        try {
            await axios.delete(`/permisos/${id}`);
            fetchPermisos(); // Refrescar la lista después de eliminar
        } catch (error) {
            console.error('Error al eliminar el permiso:', error);
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 p-8">
            <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Gestión de Permisos</h2>

            {/* Formulario de creación y edición */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">
                    {editId ? 'Editar Permiso' : 'Crear Nuevo Permiso'}
                </h3>
                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Nombre del Permiso:</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Ingrese el nombre del permiso"
                        value={formState.nombre}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    />
                    {errors.nombre && <p className="text-red-500 mt-2">{errors.nombre}</p>}
                </div>
                <button
                    onClick={createOrUpdatePermisos}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
                >
                    {editId ? 'Actualizar Permiso' : 'Crear Permiso'}
                </button>
            </div>

            {/* Tabla de permisos */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">Lista de Permisos</h3>
                <table className="min-w-full bg-white border border-pink-200 rounded-lg overflow-hidden">
                    <thead className="bg-pink-100 text-pink-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
                            <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-200">
                        {permisos.map((permiso) => (
                            <tr key={permiso.id}>
                                <td className="py-4 px-6 text-pink-900">{permiso.nombre}</td>
                                <td className="py-4 px-6 text-right">
                                    <button
                                        onClick={() => {
                                            setEditId(permiso.id);
                                            setFormState({ nombre: permiso.nombre });
                                        }}
                                        className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition ml-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deletePermisos(permiso.id)}
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

export default Permisos;
