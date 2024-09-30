import React, { useState, useEffect } from 'react';
import axios from './api';
import { Link } from 'react-router-dom';

const Delivery = () => {   //llama a componente
    const [delivery, setDelivery] = useState([]);
    const [formState, setFormState] = useState({ nombreEmpleado: '' });
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchDelivery();//mostrar todas las categorias        
    }, []);

    const fetchDelivery = async () => {  //listar
        const response = await axios.get('/delivery')
        setDelivery(response.data);///que debemos cambiar aca
    };
    const validateForm = () => {
        const newErrors = {};
        if (!formState.nombreEmpleado) newErrors.nombreEmpleado = 'Nombre es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {  //maneja cambios en los inputs,  e -> evento que sse dispara cuando alguien interactua con el componente (como escribir en un input)
        const { id, value } = e.target;  //desestructurar, elemento html que provoco el alimento, id atributo que cambia
        setFormState({ ...formState, [id]: value }); //se actualiza el formState conservando sus demas campos intactos, menos el id que sera el value del input
    };

    const resetForm = () => {
        setFormState({
            nombreEmpleado: ''
        });
        setErrors({});
        setEditId(null); // la func pasa a otro valor cuando evento onclick
    };

    const createOrUpdateDelivery = async () => {
        if (validateForm()) {
            if (editId) {
                await axios.put(`/delivery/${editId}`, formState); //edita/actualiza el valor
            } else {
                await axios.post('/delivery', formState); //crea el valor
            }
            fetchDelivery(); //lista roles
            resetForm(); // resetea el form
        }
    };

    const deleteDelivery = async (id) => {
        await axios.delete(`/delivery/${id}`);
        fetchDelivery();
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
            <h2>Delivery: </h2>
            <div>
                <label>Nombre Empleado:</label>
                <input type="text"
                    id="nombreEmpleado"
                    placeholder='Ingresar el nombre del empleado'
                    value={formState.nombreEmpleado}
                    onChange={handleInputChange}
                />
                {errors.nombreEmpleado && <p style={{ color: 'red' }} >{errors.nombreEmpleado}</p>}
                <button onClick={createOrUpdateDelivery}>{editId ? 'Actualizar Delivery' : 'Registrar Delivery'}</button>
            </div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nombre Empleado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {delivery.map((deliveryx) => (
                        <tr key={deliveryx.id}>

                            <td>{deliveryx.nombreEmpleado}</td>

                            <td> <button onClick={() => {
                                setEditId(deliveryx.id);
                                setFormState({ nombreEmpleado: deliveryx.nombreEmpleado });
                            }}>Editar</button>
                                <button onClick={() => deleteDelivery(deliveryx.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default Delivery;