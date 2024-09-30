import React, { useState, useEffect } from 'react';
import axios from './api';

const Talla = () => {
    const [tallas, setTallas] = useState([]);
    const [formState, setFormState] = useState({
        nombre: '',
        descripcion: ''
    });
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchTallas();
    }, []);

    // Obtener todas las tallas
    const fetchTallas = async () => {
        try {
            const response = await axios.get('/tallas');
            setTallas(response.data);
        } catch (error) {
            console.error('Error al obtener tallas:', error);
        }
    };

    // Validar el formulario
    const validateForm = () => {
        const newErrors = {};
        if (!formState.nombre) newErrors.nombre = 'El nombre es requerido';
        if (!formState.descripcion) newErrors.descripcion = 'La descripción es requerida';
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
            nombre: '',
            descripcion: ''
        });
        setErrors({});
        setEditId(null);  // Limpiar ID de edición
    };

    // Crear o actualizar talla
    const createOrUpdateTalla = async () => {
        if (validateForm()) {
            try {
                if (editId) {
                    await axios.put(`/tallas/${editId}`, formState);  // Editar talla
                } else {
                    await axios.post('/tallas', formState);  // Crear nueva talla
                }
                fetchTallas();  // Refrescar la lista de tallas
                resetForm();  // Limpiar el formulario
            } catch (error) {
                console.error('Error al guardar la talla:', error);
            }
        }
    };

    // Eliminar talla
    const deleteTalla = async (id) => {
        try {
            await axios.delete(`/tallas/${id}`);
            fetchTallas();
        } catch (error) {
            console.error('Error al eliminar la talla:', error);
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 p-8">

            <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Gestión de Tallas</h2>

            {/* Formulario para agregar o editar talla */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">
                    {editId ? 'Editar Talla' : 'Crear Nueva Talla'}
                </h3>

                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={formState.nombre}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    />
                    {errors.nombre && <p className="text-red-500 mt-2">{errors.nombre}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Descripción:</label>
                    <input
                        type="text"
                        id="descripcion"
                        placeholder="Ingresar la descripción de la talla"
                        value={formState.descripcion}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    />
                    {errors.descripcion && <p className="text-red-500 mt-2">{errors.descripcion}</p>}
                </div>

                <button
                    onClick={createOrUpdateTalla}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
                >
                    {editId ? 'Actualizar Talla' : 'Crear Talla'}
                </button>
            </div>

            {/* Tabla de tallas */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">Lista de Tallas</h3>
                <table className="min-w-full bg-white border border-pink-200 rounded-lg overflow-hidden">
                    <thead className="bg-pink-100 text-pink-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Descripción</th>
                            <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-200">
                        {tallas.map((talla) => (
                            <tr key={talla.id}>
                                <td className="py-4 px-6 text-pink-900">{talla.nombre}</td>
                                <td className="py-4 px-6 text-pink-900">{talla.descripcion}</td>
                                <td className="py-4 px-6 text-right">
                                    <button
                                        onClick={() => {
                                            setEditId(talla.id);
                                            setFormState({
                                                nombre: talla.nombre,
                                                descripcion: talla.descripcion
                                            });
                                        }}
                                        className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition ml-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deleteTalla(talla.id)}
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

export default Talla;
