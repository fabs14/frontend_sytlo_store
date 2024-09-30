import React, { useState, useEffect } from 'react';
import axios from './api';
import { Link } from 'react-router-dom';

const DireccionDestino = () => {   //llama a componente
    const [direccionDestino, setDireccionDestino] = useState([]);  // useState inicializa como array vacio (los roles), despues actualiza el estado, dependendiendo del back  MOSTRAR   roles= array de roles, setRoles actualiza roles para listarlos. Roles no puede cambiar sin el useState
    const [formState, setFormState] = useState({
        direccion: '',
        aliasDireccion: ''
    }); // pide los datos requieridos en los inputs del form AGREGAR
    const [editId, setEditId] = useState(null);  //guarda el id del rol que se va a editar
    const [errors, setErrors] = useState({}); //manejo de erroresz

    useEffect(() => {
        fetchDireccionDestino();
    }, []);

    const fetchDireccionDestino = async () => {
        const response = await axios.get('/direccionDestino') //espera promesa, axios.get = obtiene datos del back    (viene del index)
        setDireccionDestino(response.data); //datos del back -> cambia el state -> Direccion ya no esta vacia, se comienza a llenar de datos

    }

    const validateForm = () => {
        const newErrors = {};
        if (!formState.direccion) newErrors.direccion = 'Direccion es requerido';
        if (!formState.aliasDireccion) newErrors.aliasDireccion = 'Alias es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormState({ ...formState, [id]: value });
    };

    const resetForm = () => {
        setFormState({
            direccion: '',
            aliasDireccion: ''
        });
        setErrors({});
        setEditId(null); // la func pasa a otro valor cuando evento onclick
    };

    const createOrUpdateDireccion = async () => {
        if (validateForm()) {
            if (editId) {
                await axios.put(`/direccionDestino/${editId}`, formState); //edita/actualiza el valor
            } else {
                await axios.post('/direccionDestino', formState); //crea el valor
            }
            fetchDireccionDestino();
            resetForm(); // resetea el form
        }
    };

    const deletedireccion = async (id) => {
        await axios.delete(`/direccionDestino/${id}`);
        fetchDireccionDestino();
    }

    //Hacer el crud de categorias (checked), lotes (checked), inventario (checked) y control de calidad , donde tenga una navbar o algun componente donde se pueda navegar entre las pestañas teniendo en cuenta que tienen que estar los anteriores componentes
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
            <h2>Direccion Destino:</h2>
            <div>

                <label>Direccion:</label>
                <input type="text"
                    id="direccion"
                    placeholder='Ingresar Direccion'
                    value={formState.direccion}
                    onChange={handleInputChange}
                />
                {errors.direccion && <p style={{ color: 'red' }} >{errors.direccion}</p>}
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
            <button onClick={createOrUpdateDireccion}>{editId ? 'Actualizar Direccion' : 'Crear Direccion'}</button>

            <table border="1">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((rol) => (
                        <tr key={rol.id}>

                            <td>{rol.nombre}</td>

                            <td> <button onClick={() => {
                                setEditId(rol.id);
                                setFormState({ nombre: rol.nombre });
                            }}>Editar</button>
                                <button onClick={() => deleteRol(rol.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default Roles;  // exportar


