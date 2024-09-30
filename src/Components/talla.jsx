import React, { useState, useEffect } from 'react';
import axios from './api';
import { Link } from 'react-router-dom';

const Talla = () => {   //llama a componente
    const [talla, setTalla] = useState([]);
    const [formState, setFormState] = useState({       //rellenar inputs, campos del form
        nombre: '',
        descripcion: ''
    });
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchTalla();//mostrar todos los Talla    
    }, []);

    const fetchTalla = async () => {
        const response = await axios.get('/talla')
        setTalla(response.data);
    };


    const validateForm = () => {
        const newErrors = {};
        if (!formState.nombre) newErrors.nombre = 'Nombre es requerido';
        if (!formState.descripcion) newErrors.descripcion = 'Descripcion es requerido';
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
            descripcion: ''
        });
        setErrors({});
        setEditId(null); // la func pasa a otro valor cuando evento onclick
    };

    const createOrUpdateTalla = async () => {
        if (validateForm()) {
            if (editId) {
                await axios.put(`/talla/${editId}`, formState); //edita/actualiza el valor
            } else {
                await axios.post('/talla', formState); //crea el valor
            }
            fetchTalla(); //lista talla
            resetForm(); // resetea el form
        }
    };

    const deleteTalla = async (id) => {
        await axios.delete(`/talla/${id}`);
        fetchTalla();
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
            <h2>Gestion de Tallas:</h2>
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
                    placeholder='Ingresar la descripcion de la talla'
                    value={formState.descripcion}
                    onChange={handleInputChange}
                />
                {errors.descripcion && <p style={{ color: 'red' }} >{errors.descripcion}</p>}
            </div>

            <button onClick={createOrUpdateTalla}>{editId ? 'Actualizar talla' : 'Crear talla'}</button>

            <table border="1">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {talla.map((tallax) => (
                        <tr key={tallax.id}>

                            <td>{tallax.nombre}</td>
                            <td>{tallax.descripcion}</td>

                            <td> <button onClick={() => {
                                setEditId(tallax.id);
                                setFormState({
                                    nombre: tallax.nombre,
                                    descripcion: tallax.descripcion
                                });
                            }}>Editar</button>
                                <button onClick={() => deleteTalla(tallax.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Talla;  // exportar