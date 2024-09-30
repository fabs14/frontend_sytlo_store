import React, { useState, useEffect } from 'react';
import axios from './api'; // Instancia de Axios

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);  // Estado para las categorías
    const [formState, setFormState] = useState({ nombre: '' });  // Estado para el formulario
    const [editId, setEditId] = useState(null);  // Estado para la edición
    const [errors, setErrors] = useState({});  // Estado para errores de validación

    // Obtener todas las categorías al cargar el componente
    useEffect(() => {
        fetchCategorias();
    }, []);

    // Obtener categorías desde el backend
    const fetchCategorias = async () => {
        try {
            const response = await axios.get('/categorias');  // Cambiado a '/categorias'
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    };

    // Validar el formulario antes de enviar
    const validateForm = () => {
        const newErrors = {};
        if (!formState.nombre) newErrors.nombre = 'El nombre de la categoría es requerido';
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
        setEditId(null);  // Limpiar el ID de edición
    };

    // Crear o actualizar categorías
    const createOrUpdateCategorias = async () => {
        if (validateForm()) {
            try {
                if (editId) {
                    // Actualizar categoría existente
                    await axios.put(`/categorias/${editId}`, formState);
                } else {
                    // Crear nueva categoría
                    await axios.post('/categorias', formState);
                }
                fetchCategorias();  // Actualizar la lista de categorías
                resetForm();  // Resetear el formulario
            } catch (error) {
                console.error('Error al guardar la categoría:', error);
            }
        }
    };

    // Eliminar una categoría
    const deleteCategorias = async (id) => {
        try {
            await axios.delete(`/categorias/${id}`);
            fetchCategorias();  // Refrescar la lista después de eliminar
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 p-8">
     

            <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Gestión de Categorías</h2>

            {/* Formulario para crear o editar categoría */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">
                    {editId ? 'Editar Categoría' : 'Crear Nueva Categoría'}
                </h3>

                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Nombre de la Categoría:</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Ingresar el nombre de la categoría"
                        value={formState.nombre}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    />
                    {errors.nombre && <p className="text-red-500 mt-2">{errors.nombre}</p>}
                </div>

                <button
                    onClick={createOrUpdateCategorias}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
                >
                    {editId ? 'Actualizar Categoría' : 'Crear Categoría'}
                </button>
            </div>

            {/* Tabla de categorías */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">Lista de Categorías</h3>
                <table className="min-w-full bg-white border border-pink-200 rounded-lg overflow-hidden">
                    <thead className="bg-pink-100 text-pink-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
                            <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-200">
                        {categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <td className="py-4 px-6 text-pink-900">{categoria.nombre}</td>
                                <td className="py-4 px-6 text-right">
                                    <button
                                        onClick={() => {
                                            setEditId(categoria.id);
                                            setFormState({ nombre: categoria.nombre });
                                        }}
                                        className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition ml-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deleteCategorias(categoria.id)}
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

export default Categorias;
