import React, { useState, useEffect } from 'react';
import axios from './api';

const Sucursal = () => {
    const [sucursales, setSucursales] = useState([]);
    const [formState, setFormState] = useState({
        nombreSucursal: '',
        direccionSucursal: ''
    });
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchSucursales();  // Obtener las sucursales cuando se carga el componente
    }, []);

    // Obtener todas las sucursales
    const fetchSucursales = async () => {
        try {
            const response = await axios.get('/sucursales');
            setSucursales(response.data);
        } catch (error) {
            console.error('Error al obtener sucursales:', error);
        }
    };

    // Validar el formulario
    const validateForm = () => {
        const newErrors = {};
        if (!formState.nombreSucursal) newErrors.nombreSucursal = 'Nombre es requerido';
        if (!formState.direccionSucursal) newErrors.direccionSucursal = 'Dirección es requerida';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar cambios en los inputs
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormState({ ...formState, [id]: value });
    };

    // Resetear el formulario
    const resetForm = () => {
        setFormState({
            nombreSucursal: '',
            direccionSucursal: ''
        });
        setErrors({});
        setEditId(null);  // Limpiar ID de edición
    };

    // Crear o actualizar sucursal
    const createOrUpdateSucursal = async () => {
        if (validateForm()) {
            try {
                if (editId) {
                    await axios.put(`/sucursales/${editId}`, formState);  // Editar sucursal
                } else {
                    await axios.post('/sucursales', formState);  // Crear nueva sucursal
                }
                fetchSucursales();  // Refrescar la lista de sucursales
                resetForm();  // Limpiar el formulario
            } catch (error) {
                console.error('Error al guardar la sucursal:', error);
            }
        }
    };

    // Eliminar sucursal
    const deleteSucursal = async (id) => {
        try {
            await axios.delete(`/sucursales/${id}`);
            fetchSucursales();
        } catch (error) {
            console.error('Error al eliminar la sucursal:', error);
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 p-8">
      
            <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Gestión de Sucursales</h2>

            {/* Formulario para crear o actualizar sucursal */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">
                    {editId ? 'Editar Sucursal' : 'Crear Nueva Sucursal'}
                </h3>

                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Nombre Sucursal:</label>
                    <input
                        type="text"
                        id="nombreSucursal"
                        value={formState.nombreSucursal}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    />
                    {errors.nombreSucursal && <p className="text-red-500 mt-2">{errors.nombreSucursal}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Dirección Sucursal:</label>
                    <input
                        type="text"
                        id="direccionSucursal"
                        value={formState.direccionSucursal}
                        onChange={handleInputChange}
                        placeholder="Ingresar la dirección de la sucursal"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    />
                    {errors.direccionSucursal && <p className="text-red-500 mt-2">{errors.direccionSucursal}</p>}
                </div>

                <button
                    onClick={createOrUpdateSucursal}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
                >
                    {editId ? 'Actualizar Sucursal' : 'Crear Sucursal'}
                </button>
            </div>

            {/* Tabla de sucursales */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">Lista de Sucursales</h3>
                <table className="min-w-full bg-white border border-pink-200 rounded-lg overflow-hidden">
                    <thead className="bg-pink-100 text-pink-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Dirección</th>
                            <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-200">
                        {sucursales.map((sucursal) => (
                            <tr key={sucursal.id}>
                                <td className="py-4 px-6 text-pink-900">{sucursal.nombreSucursal}</td>
                                <td className="py-4 px-6 text-pink-900">{sucursal.direccionSucursal}</td>
                                <td className="py-4 px-6 text-right">
                                    <button
                                        onClick={() => {
                                            setEditId(sucursal.id);
                                            setFormState({
                                                nombreSucursal: sucursal.nombreSucursal,
                                                direccionSucursal: sucursal.direccionSucursal
                                            });
                                        }}
                                        className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition ml-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deleteSucursal(sucursal.id)}
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

export default Sucursal;
