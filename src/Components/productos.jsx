import React, { useState, useEffect } from 'react';
import axios from './api';
import { Link } from 'react-router-dom';

const Productos = () => {   //llama a componente
    const [productos, setProductos] = useState([]);
    const [formState, setFormState] = useState({       //rellenar inputs, campos del form
        nombre: '',
        descripcion: '',
        precio: ''
    });
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchProductos();//mostrar todos los productos    
    }, []);

    const fetchProductos = async () => {
        const response = await axios.get('/products')
        setProductos(response.data);
    };


    const validateForm = () => {
        const newErrors = {};
        if (!formState.nombre) newErrors.nombre = 'Nombre es requerido';
        if (!formState.descripcion) newErrors.descripcion = 'Descripcion es requerido';
        if (!formState.precio) newErrors.precio = 'Precio es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {  //maneja cambios en los inputs,  e -> evento que sse dispara cuando alguien interactua con el componente (como escribir en un input)
        const { id, value } = e.target;  //desestructurar, elemento html que provoco el alimento, id atributo que cambia
        setFormState({ ...formState, [id]: value }); //se actualiza el formState conservando sus demas campos intactos, menos el id que sera el value del input
    };

    const resetForm = () => {
        setFormState({
            nombre: '',
            descripcion: '',
            precio: ''
        });
        setErrors({});
        setEditId(null); // la func pasa a otro valor cuando evento onclick
    };

    const createOrUpdateProductos = async () => {
        if (validateForm()) {
            if (editId) {
                await axios.put(`/products/${editId}`, formState); //edita/actualiza el valor
            } else {
                await axios.post('/products', formState); //crea el valor
            }
            fetchProductos(); //lista roles
            resetForm(); // resetea el form
        }
    };

    const deleteProductos = async (id) => {
        await axios.delete(`/products/${id}`);
        fetchProductos();
    };

    return (

        <div>
            <nav id='nav-pages'>
                <ul>
                    <li><Link to="/">Trazabilidad</Link></li>
                    <li><Link to="/roles">Roles</Link></li>
                    <li><Link to="/productos">Productos</Link></li>
                    <li><Link to="/categorias">Categorias</Link></li>
                    <li><Link to="/lotes">Lotes</Link></li>
                    <li><Link to="/inventario">Inventario</Link></li>
                    <li><Link to="/controlCalidad">Control de Calidad</Link></li>
                </ul>
            </nav>
            <h2>Gestion de Productos:</h2>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    value={formState.nombre}
                    onChange={handleInputChange}
                />
                {errors.nombre && <span>{errors.nombre}</span>}
            </div>
            <div>
                <label>Descripcion:</label>
                <input type="text"
                    id="descripcion"
                    placeholder='Ingresar la descripcion del producto'
                    value={formState.descripcion}
                    onChange={handleInputChange}
                />
                {errors.descripcion && <p style={{ color: 'red' }} >{errors.descripcion}</p>}
            </div>
            <div>
                <label>Precio:</label>
                <input type="text"
                    id="precio"
                    placeholder='Ingresar el precio del producto'
                    value={formState.precio}
                    onChange={handleInputChange}
                />
                {errors.precio && <p style={{ color: 'red' }} >{errors.precio}</p>}
            </div>

            <button onClick={createOrUpdateProductos}>{editId ? 'Actualizar Producto' : 'Crear Producto'}</button>

            <table border="1">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>

                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.precio}</td>

                            <td> <button onClick={() => {
                                setEditId(producto.id);
                                setFormState({
                                    nombre: producto.nombre,
                                    descripcion: producto.descripcion,
                                    precio: producto.precio
                                });
                            }}>Editar</button>
                                <button onClick={() => deleteProductos(producto.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Productos;  // exportar