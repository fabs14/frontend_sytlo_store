import React, { useState, useEffect } from 'react';
import axios from './api';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [formState, setFormState] = useState({
        nombre: '',
        descripcion: '',
        precio: ''
    });
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await axios.get('/productos');  // Asegúrate de que la URL sea correcta
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formState.nombre) newErrors.nombre = 'El nombre es requerido';
        if (!formState.descripcion) newErrors.descripcion = 'La descripción es requerida';
        if (!formState.precio) newErrors.precio = 'El precio es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormState({ ...formState, [id]: value });
    };

    const resetForm = () => {
        setFormState({
            nombre: '',
            descripcion: '',
            precio: ''
        });
        setErrors({});
        setEditId(null);
    };

    const createOrUpdateProductos = async () => {
        if (validateForm()) {
            try {
                if (editId) {
                    // Actualizar un producto existente
                    await axios.put(`/productos/${editId}`, formState);
                } else {
                    // Crear un nuevo producto
                    await axios.post('/productos', formState);
                }
                fetchProductos();
                resetForm();
            } catch (error) {
                console.error('Error al guardar el producto:', error);
            }
        }
    };

    const deleteProductos = async (id) => {
        try {
            await axios.delete(`/productos/${id}`);
            fetchProductos();
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 p-8">
        

            <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Gestión de Productos</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">{editId ? 'Editar Producto' : 'Crear Nuevo Producto'}</h3>
                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Nombre del Producto:</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Ingrese el nombre del producto"
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
                        placeholder="Ingrese la descripción del producto"
                        value={formState.descripcion}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    />
                    {errors.descripcion && <p className="text-red-500 mt-2">{errors.descripcion}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Precio:</label>
                    <input
                        type="text"
                        id="precio"
                        placeholder="Ingrese el precio del producto"
                        value={formState.precio}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    />
                    {errors.precio && <p className="text-red-500 mt-2">{errors.precio}</p>}
                </div>

                <button
                    onClick={createOrUpdateProductos}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
                >
                    {editId ? 'Actualizar Producto' : 'Crear Producto'}
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">Lista de Productos</h3>
                <table className="min-w-full bg-white border border-pink-200 rounded-lg overflow-hidden">
                    <thead className="bg-pink-100 text-pink-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Descripción</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Precio</th>
                            <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-200">
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td className="py-4 px-6 text-pink-900">{producto.nombre}</td>
                                <td className="py-4 px-6 text-pink-900">{producto.descripcion}</td>
                                <td className="py-4 px-6 text-pink-900">{producto.precio}</td>
                                <td className="py-4 px-6 text-right">
                                    <button
                                        onClick={() => {
                                            setEditId(producto.id);
                                            setFormState({
                                                nombre: producto.nombre,
                                                descripcion: producto.descripcion,
                                                precio: producto.precio
                                            });
                                        }}
                                        className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition ml-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deleteProductos(producto.id)}
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

export default Productos;
