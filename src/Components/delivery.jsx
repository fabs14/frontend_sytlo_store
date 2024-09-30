import React, { useState, useEffect } from 'react';
import axios from './api'; // Instancia de Axios

const Delivery = () => {
    const [delivery, setDelivery] = useState([]);  // Estado para delivery
    const [formState, setFormState] = useState({ nombreEmpleado: '' });  // Estado para el formulario
    const [editId, setEditId] = useState(null);  // Estado para la edición
    const [errors, setErrors] = useState({});  // Estado para los errores de validación

    // Cargar lista de empleados de delivery al iniciar
    useEffect(() => {
        fetchDelivery();
    }, []);

    // Obtener lista de empleados de delivery desde el backend
    const fetchDelivery = async () => {
        try {
            const response = await axios.get('/deliveries');
            setDelivery(response.data);  // Actualizar el estado con la lista de empleados
        } catch (error) {
            console.error('Error al obtener la lista de empleados de delivery:', error);
        }
    };

    // Validar el formulario antes de enviar
    const validateForm = () => {
        const newErrors = {};
        if (!formState.nombreEmpleado) newErrors.nombreEmpleado = 'El nombre es requerido';
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
        setFormState({ nombreEmpleado: '' });
        setErrors({});
        setEditId(null);  // Limpiar el ID de edición
    };

    // Crear o actualizar empleado de delivery
    const createOrUpdateDelivery = async () => {
        if (validateForm()) {
            try {
                if (editId) {
                    // Actualizar empleado existente
                    await axios.put(`/deliveries/${editId}`, formState);
                } else {
                    // Crear nuevo empleado
                    await axios.post('/deliveries', formState);
                }
                fetchDelivery();  // Actualizar la lista de empleados
                resetForm();  // Resetear el formulario
            } catch (error) {
                console.error('Error al guardar el empleado de delivery:', error);
            }
        }
    };

    // Eliminar un empleado de delivery
    const deleteDelivery = async (id) => {
        try {
            await axios.delete(`/deliveries/${id}`);
            fetchDelivery();  // Refrescar la lista después de eliminar
        } catch (error) {
            console.error('Error al eliminar el empleado de delivery:', error);
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 p-8">
       

            <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Gestión de Empleados de Delivery</h2>

            {/* Formulario de creación o edición */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">
                    {editId ? 'Editar Empleado de Delivery' : 'Registrar Nuevo Empleado'}
                </h3>

                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Nombre del Empleado:</label>
                    <input
                        type="text"
                        id="nombreEmpleado"
                        placeholder="Ingresar el nombre del empleado"
                        value={formState.nombreEmpleado}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    />
                    {errors.nombreEmpleado && <p className="text-red-500 mt-2">{errors.nombreEmpleado}</p>}
                </div>

                <button
                    onClick={createOrUpdateDelivery}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
                >
                    {editId ? 'Actualizar Empleado' : 'Registrar Empleado'}
                </button>
            </div>

            {/* Tabla de empleados de delivery */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">Lista de Empleados</h3>
                <table className="min-w-full bg-white border border-pink-200 rounded-lg overflow-hidden">
                    <thead className="bg-pink-100 text-pink-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Nombre del Empleado</th>
                            <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-200">
                        {delivery.map((empleado) => (
                            <tr key={empleado.id}>
                                <td className="py-4 px-6 text-pink-900">{empleado.nombreEmpleado}</td>
                                <td className="py-4 px-6 text-right">
                                    <button
                                        onClick={() => {
                                            setEditId(empleado.id);
                                            setFormState({ nombreEmpleado: empleado.nombreEmpleado });
                                        }}
                                        className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition ml-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deleteDelivery(empleado.id)}
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

export default Delivery;
