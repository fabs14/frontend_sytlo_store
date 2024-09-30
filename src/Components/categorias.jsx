import React, { useState, useEffect } from 'react';
import axios from './api';
import { Link } from 'react-router-dom';

const Categorias = () => {   //llama a componente
    const [categorias, setCategorias] = useState([]);
    const [formState, setFormState] = useState({ nombre: '' });
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchCategorias();//mostrar todas las categorias        
    }, []);

    const fetchCategorias = async () => {  //listar
        const response = await axios.get('/categories')
        setCategorias(response.data);///que debemos cambiar aca
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

    const createOrUpdateCategorias = async () => {
        if (validateForm()) {
            if (editId) {
                await axios.put(`/categories/${editId}`, formState); //edita/actualiza el valor
            } else {
                await axios.post('/categories', formState); //crea el valor
            }
            fetchCategorias(); //lista roles
            resetForm(); // resetea el form
        }
    };

    const deleteCategorias = async (id) => {
        await axios.delete(`/categories/${id}`);
        fetchCategorias();
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
            <h2>Categorias: </h2>
            <div>
                <label>Nombre Categoria:</label>
                <input type="text"
                    id="nombre"
                    placeholder='Ingresar el nombre de la categorias'
                    value={formState.nombre}
                    onChange={handleInputChange}
                />
                {errors.nombre && <p style={{ color: 'red' }} >{errors.nombre}</p>}
                <button onClick={createOrUpdateCategorias}>{editId ? 'Actualizar Categoria' : 'Crear Categoria'}</button>
            </div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria) => (
                        <tr key={categoria.id}>

                            <td>{categoria.nombre}</td>

                            <td> <button onClick={() => {
                                setEditId(categoria.id);
                                setFormState({ nombre: categoria.nombre });
                            }}>Editar</button>
                                <button onClick={() => deleteCategorias(categoria.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default Categorias;