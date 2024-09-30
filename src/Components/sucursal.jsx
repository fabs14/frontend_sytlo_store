import React, { useState, useEffect } from 'react';
import axios from './api';
import { Link } from 'react-router-dom';

const Sucursal = () => {   //llama a componente
    const [sucursal, setSucursal] = useState([]);
    const [formState, setFormState] = useState({       //rellenar inputs, campos del form
        nombreSucursal: '',
        direccionSucursal: ''
    });
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchSucursal();//mostrar todos los Sucursal    
    }, []);

    const fetchSucursal = async () => {
        const response = await axios.get('/sucursal')
        setSucursal(response.data);
    };


    const validateForm = () => {
        const newErrors = {};
        if (!formState.nombreSucursal) newErrors.nombreSucursal = 'Nombre es requerido';
        if (!formState.direccionSucursal) newErrors.direccionSucursal = 'Direccion es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {  //maneja cambios en los inputs,  e -> evento que sse dispara cuando alguien interactua con el componente (como escribir en un input)
        const { id, value } = e.target;  //desestructurar, elemento html que provoco el alimento, id atributo que cambia
        setFormState({ ...formState, [id]: value }); //se actualiza el formState conservando sus demas campos intactos, menos el id que sera el value del input
    };

    const resetForm = () => {
        setFormState({
            nombreSucursal: '',
            direccionSucursal: ''
        });
        setErrors({});
        setEditId(null); // la func pasa a otro valor cuando evento onclick
    };

    const createOrUpdateSucursal = async () => {
        if (validateForm()) {
            if (editId) {
                await axios.put(`/sucursal/${editId}`, formState); //edita/actualiza el valor
            } else {
                await axios.post('/sucursal', formState); //crea el valor
            }
            fetchSucursal(); //lista roles
            resetForm(); // resetea el form
        }
    };

    const deleteSucursal = async (id) => {
        await axios.delete(`/sucursal/${id}`);
        fetchSucursal();
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
            <h2>Gestion de Sucursales:</h2>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    id="nombreSucursal"
                    value={formState.nombreSucursal}
                    onChange={handleInputChange}
                />
                {errors.nombreSucursal && <span>{errors.nombreSucursal}</span>}
            </div>
            <div>
                <label>Direccion:</label>
                <input type="text"
                    id="direccionSucursal"
                    placeholder='Ingresar la direccion de la Sucursal'
                    value={formState.direccionSucursal}
                    onChange={handleInputChange}
                />
                {errors.direccionSucursal && <p style={{ color: 'red' }} >{errors.direccionSucursal}</p>}
            </div>

            <button onClick={createOrUpdateSucursal}>{editId ? 'Actualizar Sucursal' : 'Crear Sucursal'}</button>

            <table border="1">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Direccion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sucursal.map((sucursales) => (
                        <tr key={sucursales.id}>

                            <td>{sucursales.nombreSucursal}</td>
                            <td>{sucursales.direccionSucursal}</td>

                            <td> <button onClick={() => {
                                setEditId(sucursales.id);
                                setFormState({
                                    nombre: sucursales.nombreSucursal,
                                    descripcion: sucursales.direccionSucursal
                                });
                            }}>Editar</button>
                                <button onClick={() => deleteSucursal(sucursales.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Sucursal;  // exportar