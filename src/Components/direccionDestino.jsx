import React, { useState, useEffect } from 'react';
import axios from './api';

const DireccionDestino = () => {
    const [direccionDestino, setDireccionDestino] = useState([]);  // Estado para la lista de direcciones
    const [formState, setFormState] = useState({
        direccion: '',
        aliasDireccion: ''
    }); // Estado para los datos del formulario
    const [editId, setEditId] = useState(null);  // Estado para el ID en edición
    const [errors, setErrors] = useState({}); // Manejo de errores

    // Fetch de las direcciones al cargar el componente
    useEffect(() => {
        fetchDireccionDestino();
    }, []);

    // Obtener direcciones desde la API
    const fetchDireccionDestino = async () => {
        try {
            const response = await axios.get('/direccionentrega'); // Cambiado el endpoint
            setDireccionDestino(response.data); // Guardar las direcciones obtenidas
        } catch (error) {
            console.error('Error al obtener direcciones:', error);
        }
    };

    // Validar el formulario
    const validateForm = () => {
        const newErrors = {};
        if (!formState.direccion) newErrors.direccion = 'Dirección es requerida';
        if (!formState.aliasDireccion) newErrors.aliasDireccion = 'Alias es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar cambios en los inputs del formulario
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormState({ ...formState, [id]: value });
    };

    // Resetear el formulario
    const resetForm = () => {
        setFormState({
            direccion: '',
            aliasDireccion: ''
        });
        setErrors({});
        setEditId(null);  // Limpiar el ID de edición
    };

    // Crear o actualizar dirección
    const createOrUpdateDireccion = async () => {
        if (validateForm()) {
            try {
                if (editId) {
                    await axios.put(`/direccionentrega/${editId}`, formState); // Editar dirección existente
                } else {
                    await axios.post('/direccionentrega', formState); // Crear nueva dirección
                }
                fetchDireccionDestino(); // Refrescar la lista de direcciones
                resetForm(); // Limpiar el formulario
            } catch (error) {
                console.error('Error al guardar la dirección:', error);
            }
        }
    };

    // Eliminar dirección
    const deleteDireccionDestino = async (id) => {
        try {
            await axios.delete(`/direccionentrega/${id}`);
            fetchDireccionDestino(); // Refrescar la lista de direcciones
        } catch (error) {
            console.error('Error al eliminar la dirección:', error);
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 p-8">


            <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Gestión de Direcciones de Entrega</h2>

            {/* Formulario para agregar o editar */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">
                    {editId ? 'Editar Dirección' : 'Crear Nueva Dirección'}
                </h3>
                
                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Dirección:</label>
                    <input
                        type="text"
                        id="direccion"
                        placeholder="Ingresar Dirección"
                        value={formState.direccion}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    />
                    {errors.direccion && <p className="text-red-500 mt-2">{errors.direccion}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Alias de la Dirección:</label>
                    <input
                        type="text"
                        id="aliasDireccion"
                        placeholder="Ingresar alias de la dirección"
                        value={formState.aliasDireccion}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    />
                    {errors.aliasDireccion && <p className="text-red-500 mt-2">{errors.aliasDireccion}</p>}
                </div>

                <button
                    onClick={createOrUpdateDireccion}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
                >
                    {editId ? 'Actualizar Dirección' : 'Crear Dirección'}
                </button>
            </div>

            {/* Tabla de direcciones */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">Lista de Direcciones</h3>
                <table className="min-w-full bg-white border border-pink-200 rounded-lg overflow-hidden">
                    <thead className="bg-pink-100 text-pink-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Dirección</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Alias</th>
                            <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-200">
                        {direccionDestino.map((direccion) => (
                            <tr key={direccion.id}>
                                <td className="py-4 px-6 text-pink-900">{direccion.direccion}</td>
                                <td className="py-4 px-6 text-pink-900">{direccion.aliasDireccion}</td>
                                <td className="py-4 px-6 text-right">
                                    <button
                                        onClick={() => {
                                            setEditId(direccion.id);
                                            setFormState({
                                                direccion: direccion.direccion,
                                                aliasDireccion: direccion.aliasDireccion
                                            });
                                        }}
                                        className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition ml-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deleteDireccionDestino(direccion.id)}
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
};

export default DireccionDestino;
