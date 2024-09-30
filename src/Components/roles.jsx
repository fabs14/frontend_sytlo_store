import React, { useState, useEffect } from 'react';
import axios from './api';
import { Link } from 'react-router-dom';

const Roles = () => {   //llama a componente
    const [roles, setRoles] = useState([]);  // useState inicializa como array vacio (los roles), despues actualiza el estado, dependendiendo del back  MOSTRAR   roles= array de roles, setRoles actualiza roles para listarlos. Roles no puede cambiar sin el useState
    const [formState, setFormState] = useState({ nombre: '' }); // pide los datos requieridos en los inputs del form AGREGAR
    const [editId, setEditId] = useState(null);  //guarda el id del rol que se va a editar
    const [errors, setErrors] = useState({}); //manejo de erroresz

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        const response = await axios.get('/roles') //espera promesa, axios.get = obtiene datos del back    (viene del index)
        setRoles(response.data); //datos del back -> cambia el state -> roles ya no esta vacia, se comienza a llenar de datos

    }

    const validateForm = () => {
        const newErrors = {};
        if (!formState.nombre) newErrors.nombre = 'Nombre es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {  //maneja cambios en los inputs,  e -> evento que sse dispara cuando alguien interactua con el componente (como escribir en un input)
        const { id, value } = e.target;  //desestructurar, elemento html que provoco el alimento, id atributo que cambia
        setFormState({ ...formState, [id]: value }); //se actualiza el formState conservando sus demas campos intactos, menos el id que sera el value del input
    };

    const resetForm = () => {
        setFormState({ nombre: '' });
        setErrors({});
        setEditId(null); // la func pasa a otro valor cuando evento onclick
    };

    const createOrUpdateRol = async () => {
        if (validateForm()) {
            if (editId) {
                await axios.put(`/roles/${editId}`, formState); //edita/actualiza el valor
            } else {
                await axios.post('/roles', formState); //crea el valor
            }
            fetchRoles(); //lista roles
            resetForm(); // resetea el form
        }
    };

    const deleteRol = async (id) => {
        await axios.delete(`/roles/${id}`);
        fetchRoles();
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
            <h2>Roles</h2>
            <div>

                <label>Nombre Roles:</label>
                <input type="text"
                    id="nombre"
                    placeholder='Ingresar el nombre del rol'
                    value={formState.nombre}
                    onChange={handleInputChange}
                />
                {errors.nombre && <p style={{ color: 'red' }} >{errors.nombre}</p>}
                <button onClick={createOrUpdateRol}>{editId ? 'Actualizar Rol' : 'Crear Rol'}</button>
            </div>
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


