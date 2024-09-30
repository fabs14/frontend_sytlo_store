import React, { useState, useEffect } from 'react';
import axios from './api';
import { Link } from 'react-router-dom';

const Inventario = () => {   //llama a componente
    const [invetario, setInventario] = useState([]);
    const [productos, setProductos] = useState([]);  // obtener info de productos
    const [talla, setTalla] = useState([]);  // obtener info de Tallas
    const [formState, setFormState] =
        useState({
            producto_id: '',
            talla_id: '',
            cantidad: '',
            fechaActualizacion: ''
        });
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchInventario();//mostrar todas las categorias  
        fetchProductos(); //mostrar todas los productos 
        fetchTallas();
    }, []);

    const fetchInventario = async () => {  //listar
        const response = await axios.get('/productotallainventario')
        setInventario(response.data);///que debemos cambiar aca
    };
    const fetchProductos = async () => {
        const response = await axios.get('/products')
        setProductos(response.data);
    };
    const fetchTallas = async () => {
        const response = await axios.get('/talla')
        setTalla(response.data);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formState.producto_id) newErrors.producto_id = 'producto id es requerido';
        if (!formState.talla_id) newErrors.talla_id = 'Talla id es requerido';
        if (!formState.cantidad_disponible) newErrors.cantidad_disponible = 'cantidad disponible es requerido';
        if (!formState.fechaActualizacion) newErrors.fechaActualizacion = 'fecha es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {  //maneja cambios en los inputs,  e -> evento que sse dispara cuando alguien interactua con el componente (como escribir en un input)
        const { id, value } = e.target;  //desestructurar, elemento html que provoco el alimento, id atributo que cambia
        setFormState({ ...formState, [id]: value }); //se actualiza el formState conservando sus demas campos intactos, menos el id que sera el value del input
    };

    const resetForm = () => {
        setFormState({
            producto_id: '',
            talla_id: '',
            cantidad: '',
            fechaActualizacion: ''
        });
        setErrors({});
        setEditId(null); // la func pasa a otro valor cuando evento onclick
    };

    const createOrUpdateInventario = async () => {
        if (validateForm()) {
            if (editId) {
                await axios.put(`/productotallainventario/${editId}`, formState); //edita/actualiza el valor
            } else {
                await axios.post('/productotallainventario', formState); //crea el valor
            }
            fetchInventario(); //lista roles
            resetForm(); // resetea el form
        }
    };

    const deleteInventario = async (id) => {
        await axios.delete(`/productotallainventario/${id}`);
        fetchInventario();
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
            <h2>Gestion de Inventario:</h2>
            <div>
                <label>Producto:</label>
                <select
                    id="producto_id"
                    value={formState.producto_id}
                    onChange={handleInputChange}
                >
                    <option value="">Seleccionar Producto</option>
                    {productos.map((producto) => (
                        <option key={producto.id} value={producto.id}>
                            {producto.nombre}
                        </option>
                    ))}
                </select>
                {errors.producto_id && <p style={{ color: 'red' }} >{errors.producto_id}</p>}
            </div>
            <div>
                <label>Talla:</label>
                <select
                    id="talla_id"
                    value={formState.talla_id}
                    onChange={handleInputChange}
                >
                    <option value="">Seleccionar Talla</option>
                    {talla.map((tallas) => (
                        <option key={tallas.id} value={tallas.id}>
                            {tallas.nombre}
                        </option>
                    ))}
                </select>
                {errors.talla_id && <p style={{ color: 'red' }} >{errors.talla_id}</p>}
            </div>
            <div>
                <label>Cantidad:</label>
                <input type="text"
                    id="cantidad"
                    placeholder='Ingresar cantidad'
                    value={formState.cantidad}
                    onChange={handleInputChange}
                />
                {errors.cantidad && <p style={{ color: 'red' }} >{errors.cantidad}</p>}
            </div>
            <button onClick={createOrUpdateInventario}>{editId ? 'Actualizar Inventario' : 'Crear Inventario'}</button>
            <div>
                <label>Fecha:</label>
                <input type="date"
                    id="fechaActualizacion"
                    value={formState.fechaActualizacion}
                    onChange={handleInputChange}
                />
                {errors.fechaActualizacion && <p style={{ color: 'red' }} >{errors.fechaActualizacion}</p>}
            </div>

            <table border="1">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Talla</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {invetario.map((inventariox) => (
                        <tr key={inventariox.id}>

                            <td>{inventariox.producto_id}</td>
                            <td>{inventariox.talla_id}</td>
                            <td>{inventariox.cantidad}</td>
                            <td>{inventariox.fechaActualizacion}</td>

                            <td> <button onClick={() => {
                                setEditId(inventariox.id);
                                setFormState({
                                    producto_id: inventariox.producto_id,
                                    talla_id: inventariox.talla_id,
                                    cantidad: inventariox.cantidad,
                                    fechaActualizacion: inventariox.fechaActualizacion
                                });
                            }}>Editar</button>
                                <button onClick={() => deleteInventario(inventariox.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>



        </div>


    )

}

export default Inventario;