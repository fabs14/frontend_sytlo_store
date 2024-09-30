import React, { useState, useEffect } from 'react';
import axios from './api';
import { Link } from 'react-router-dom';

const Permisos = () => {   //llama a componente
    const [permisos, setPermisos] = useState([]);
    const [formState, setFormState] = useState({ nombre: '' });
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchPermisos();//mostrar todas las categorias        
    }, []);

    const fetchPermisos = async () => {  //listar
        const response = await axios.get('/Permisos')
        setPermisos(response.data);///que debemos cambiar aca
    };
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
        setFormState({
            nombre: ''
        });
        setErrors({});
        setEditId(null); // la func pasa a otro valor cuando evento onclick
    };

    const createOrUpdatePermisos = async () => {
        if (validateForm()) {
            if (editId) {
                await axios.put(`/Permisos/${editId}`, formState); //edita/actualiza el valor
            } else {
                await axios.post('/Permisos', formState); //crea el valor
            }
            fetchPermisos(); //lista roles
            resetForm(); // resetea el form
        }
    };

    const deletePermisos = async (id) => {
        await axios.delete(`/Permisos/${id}`);
        fetchPermisos();
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
            <h2>Permisos: </h2>
            <div>
                <label>Nombre Permiso:</label>
                <input type="text"
                    id="nombre"
                    placeholder='Ingresar el nombre del permiso'
                    value={formState.nombre}
                    onChange={handleInputChange}
                />
                {errors.nombre && <p style={{ color: 'red' }} >{errors.nombre}</p>}
                <button onClick={createOrUpdatePermisos}>{editId ? 'Actualizar Permiso' : 'Crear Permiso'}</button>
            </div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {permisos.map((permiso) => (
                        <tr key={permiso.id}>

                            <td>{permiso.nombre}</td>

                            <td> <button onClick={() => {
                                setEditId(permiso.id);
                                setFormState({ nombre: permiso.nombre });
                            }}>Editar</button>
                                <button onClick={() => deletePermisos(permiso.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default Permisos;