import React, { useState, useEffect } from 'react';
import axios from './api';

const MetodoPago = () => {
    const [metodosPago, setMetodosPago] = useState([]); // Estado para almacenar los métodos de pago
    const [formState, setFormState] = useState({ nombreMetodo: '' }); // Estado para manejar el formulario
    const [editId, setEditId] = useState(null); // Estado para identificar si se está editando
    const [errors, setErrors] = useState({}); // Estado para manejar errores

    useEffect(() => {
        fetchMetodosPago(); // Obtener todos los métodos de pago al cargar el componente
    }, []);

    // Obtener los métodos de pago desde el backend
    const fetchMetodosPago = async () => {
        try {
            const response = await axios.get('/metodospago');
            setMetodosPago(response.data); // Actualizar estado con los métodos de pago obtenidos
        } catch (error) {
            console.error('Error al obtener métodos de pago:', error);
        }
    };

    // Validar el formulario antes de enviar
    const validateForm = () => {
        const newErrors = {};
        if (!formState.nombreMetodo) newErrors.nombreMetodo = 'El nombre del método es requerido';
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
        setFormState({ nombreMetodo: '' });
        setErrors({});
        setEditId(null); // Limpiar el ID de edición
    };

    // Crear o actualizar método de pago
    const createOrUpdateMetodoPago = async () => {
        if (validateForm()) {
            try {
                if (editId) {
                    await axios.put(`/metodospago/${editId}`, formState);  // Editar método de pago
                } else {
                    await axios.post('/metodospago', formState);  // Crear nuevo método de pago
                }
                fetchMetodosPago();  // Refrescar la lista de métodos
                resetForm();  // Limpiar el formulario
            } catch (error) {
                console.error('Error al guardar el método de pago:', error);
            }
        }
    };

    // Eliminar método de pago
    const deleteMetodoPago = async (id) => {
        try {
            await axios.delete(`/metodospago/${id}`);
            fetchMetodosPago();
        } catch (error) {
            console.error('Error al eliminar método de pago:', error);
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 p-8">
      

            <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Gestión de Métodos de Pago</h2>

            {/* Formulario para agregar o editar método de pago */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">
                    {editId ? 'Editar Método de Pago' : 'Crear Nuevo Método de Pago'}
                </h3>

                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Nombre del Método:</label>
                    <input
                        type="text"
                        id="nombreMetodo"
                        value={formState.nombreMetodo}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    />
                    {errors.nombreMetodo && <p className="text-red-500 mt-2">{errors.nombreMetodo}</p>}
                </div>

                <button
                    onClick={createOrUpdateMetodoPago}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
                >
                    {editId ? 'Actualizar Método' : 'Crear Método'}
                </button>
            </div>

            {/* Tabla de métodos de pago */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">Lista de Métodos de Pago</h3>
                <table className="min-w-full bg-white border border-pink-200 rounded-lg overflow-hidden">
                    <thead className="bg-pink-100 text-pink-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Nombre del Método</th>
                            <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-200">
                        {metodosPago.map((metodo) => (
                            <tr key={metodo.id}>
                                <td className="py-4 px-6 text-pink-900">{metodo.nombreMetodo}</td>
                                <td className="py-4 px-6 text-right">
                                    <button
                                        onClick={() => {
                                            setEditId(metodo.id);
                                            setFormState({ nombreMetodo: metodo.nombreMetodo });
                                        }}
                                        className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition ml-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deleteMetodoPago(metodo.id)}
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

export default MetodoPago;
