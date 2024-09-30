import React, { useState, useEffect } from 'react';
import axios from './api';

const Inventario = () => {
    const [inventario, setInventario] = useState([]);
    const [productos, setProductos] = useState([]);
    const [tallas, setTallas] = useState([]);
    const [formState, setFormState] = useState({
        producto_id: '',
        talla_id: '',
        cantidad: '',
        fechaActualizacion: ''
    });
    const [editId, setEditId] = useState(null);
    const [ setErrors] = useState({});

    useEffect(() => {
        fetchInventario();
        fetchProductos();
        fetchTallas();
    }, []);

    const fetchInventario = async () => {
        try {
            const response = await axios.get('/productotallainventario');
            setInventario(response.data);
            console.log('Inventario:', response.data);
        } catch (error) {
            console.error('Error al obtener inventario:', error);
        }
    };

    const fetchProductos = async () => {
        try {
            const response = await axios.get('/productos');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const fetchTallas = async () => {
        try {
            const response = await axios.get('/tallas');
            setTallas(response.data);
        } catch (error) {
            console.error('Error al obtener tallas:', error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormState({ ...formState, [id]: value });
    };

    const resetForm = () => {
        setFormState({
            producto_id: '',
            talla_id: '',
            cantidad: '',
            fechaActualizacion: ''
        });
        setErrors({});
        setEditId(null);
    };

    const createOrUpdateInventario = async () => {
        try {
            if (editId) {
                await axios.put(`/productotallainventario/${editId}`, formState);
            } else {
                await axios.post('/productotallainventario', formState);
            }
            fetchInventario();
            resetForm();
        } catch (error) {
            console.error('Error al guardar el inventario:', error);
        }
    };

    const deleteInventario = async (id) => {
        try {
            await axios.delete(`/productotallainventario/${id}`);
            fetchInventario();
        } catch (error) {
            console.error('Error al eliminar inventario:', error);
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 p-8">
            <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Gestión de Inventario</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">
                    {editId ? 'Editar Inventario' : 'Crear Nuevo Inventario'}
                </h3>

                {/* Formulario para agregar o editar inventario */}
                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Producto:</label>
                    <select
                        id="producto_id"
                        value={formState.producto_id}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    >
                        <option value="">Seleccionar Producto</option>
                        {productos.map((producto) => (
                            <option key={producto.id} value={producto.id}>
                                {producto.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Talla:</label>
                    <select
                        id="talla_id"
                        value={formState.talla_id}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    >
                        <option value="">Seleccionar Talla</option>
                        {tallas.map((talla) => (
                            <option key={talla.id} value={talla.id}>
                                {talla.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Cantidad:</label>
                    <input
                        type="number"
                        id="cantidad"
                        value={formState.cantidad}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                        placeholder="Ingrese la cantidad"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-pink-600 font-medium mb-2">Fecha:</label>
                    <input
                        type="date"
                        id="fechaActualizacion"
                        value={formState.fechaActualizacion}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
                    />
                </div>

                <button
                    onClick={createOrUpdateInventario}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
                >
                    {editId ? 'Actualizar Inventario' : 'Crear Inventario'}
                </button>
            </div>

            {/* Tabla de inventario */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-pink-600 mb-4">Lista de Inventario</h3>
                <table className="min-w-full bg-white border border-pink-200 rounded-lg overflow-hidden">
                    <thead className="bg-pink-100 text-pink-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">ID Producto</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">ID Talla</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Producto</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Talla</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Cantidad</th>
                            <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Fecha</th>
                            <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-200">
                        {inventario.map((item) => {
                            const producto = productos.find(p => p.id === item.productoId);
                            const talla = tallas.find(t => t.id === item.tallaId);
                            
                            return (
                                <tr key={item.id}>
                                    <td className="py-4 px-6 text-pink-900">{item.productoId}</td>
                                    <td className="py-4 px-6 text-pink-900">{item.tallaId}</td>
                                    <td className="py-4 px-6 text-pink-900">{producto ? producto.nombre : 'No encontrado'}</td>
                                    <td className="py-4 px-6 text-pink-900">{talla ? talla.nombre : 'No encontrado'}</td>
                                    <td className="py-4 px-6 text-pink-900">{item.cantidad}</td>
                                    <td className="py-4 px-6 text-pink-900">{new Date(item.fechaActualizacion).toLocaleDateString()}</td>
                                    <td className="py-4 px-6 text-right">
                                        <button
                                            onClick={() => {
                                                setEditId(item.id);
                                                setFormState({
                                                    producto_id: item.productoId,
                                                    talla_id: item.tallaId,
                                                    cantidad: item.cantidad,
                                                    fechaActualizacion: item.fechaActualizacion
                                                });
                                            }}
                                            className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition ml-2"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => deleteInventario(item.id)}
                                            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition ml-2"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventario;
