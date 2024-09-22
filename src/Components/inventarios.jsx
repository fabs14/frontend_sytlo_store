import React, { useState } from 'react';

// Productos previamente definidos
const productos = [
  { id: 1, nombre: 'Polera Roja', descripcion: 'Polera de algodón', talla: 'M', categoria: 'Polera' },
  { id: 2, nombre: 'Pantalon Jeans', descripcion: 'Jeans azul', talla: '32', categoria: 'Pantalon' },
  { id: 3, nombre: 'Top Blanco', descripcion: 'Top de verano', talla: 'S', categoria: 'Top' },
  { id: 4, nombre: 'Falda Negra', descripcion: 'Falda elegante', talla: 'L', categoria: 'Falda' }
];

const InventarioCrud = () => {
  const [inventario, setInventario] = useState([
    { id: 1, productoId: 1, cantidad: 50, talla: 'M', fechaActualizacion: '2024-09-20' },
    { id: 2, productoId: 2, cantidad: 30, talla: '32', fechaActualizacion: '2024-09-21' },
    { id: 3, productoId: 3, cantidad: 20, talla: 'S', fechaActualizacion: '2024-09-22' }
  ]);

  const [newInventario, setNewInventario] = useState({
    productoId: productos[0].id,
    cantidad: '',
    talla: productos[0].talla,
    fechaActualizacion: new Date().toISOString().slice(0, 10)
  });

  const [editInventarioId, setEditInventarioId] = useState(null);
  const [editInventario, setEditInventario] = useState({
    productoId: '',
    cantidad: '',
    talla: '',
    fechaActualizacion: ''
  });

  const handleAddInventario = () => {
    if (newInventario.cantidad.trim()) {
      setInventario([...inventario, { id: inventario.length + 1, ...newInventario }]);
      setNewInventario({
        productoId: productos[0].id,
        cantidad: '',
        talla: productos[0].talla,
        fechaActualizacion: new Date().toISOString().slice(0, 10)
      });
    }
  };

  const handleEditInventario = (id) => {
    const itemToEdit = inventario.find((item) => item.id === id);
    setEditInventarioId(id);
    setEditInventario(itemToEdit);
  };

  const handleSaveEdit = () => {
    setInventario(
      inventario.map((item) =>
        item.id === editInventarioId ? { ...item, ...editInventario } : item
      )
    );
    setEditInventarioId(null);
    setEditInventario({
      productoId: '',
      cantidad: '',
      talla: '',
      fechaActualizacion: ''
    });
  };

  const handleDeleteInventario = (id) => {
    setInventario(inventario.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-pink-50 min-h-screen p-8 font-sans">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Gestión de Inventario</h2>

      <div className="mb-4 flex justify-center items-center">
        <select
          value={newInventario.productoId}
          onChange={(e) => {
            const selectedProduct = productos.find(p => p.id === parseInt(e.target.value));
            setNewInventario({
              ...newInventario,
              productoId: selectedProduct.id,
              talla: selectedProduct.talla
            });
          }}
          className="p-2 rounded-l-lg border border-pink-400 focus:outline-none focus:border-pink-600"
        >
          {productos.map((producto) => (
            <option key={producto.id} value={producto.id}>
              {producto.nombre} - Talla: {producto.talla}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={newInventario.cantidad}
          onChange={(e) => setNewInventario({ ...newInventario, cantidad: e.target.value })}
          placeholder="Cantidad"
          className="p-2 border border-pink-400 focus:outline-none focus:border-pink-600 mx-2"
        />
        <input
          type="date"
          value={newInventario.fechaActualizacion}
          onChange={(e) => setNewInventario({ ...newInventario, fechaActualizacion: e.target.value })}
          className="p-2 border border-pink-400 focus:outline-none focus:border-pink-600"
        />
        <button
          onClick={handleAddInventario}
          className="bg-pink-500 text-white px-4 py-2 rounded-r-lg hover:bg-pink-600 transition duration-300 ml-2"
        >
          Agregar al Inventario
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-pink-200 shadow-lg rounded-lg">
          <thead className="bg-pink-100">
            <tr>
              <th className="py-3 px-4 text-left text-pink-600 font-semibold">Producto</th>
              <th className="py-3 px-4 text-left text-pink-600 font-semibold">Talla</th>
              <th className="py-3 px-4 text-left text-pink-600 font-semibold">Cantidad</th>
              <th className="py-3 px-4 text-left text-pink-600 font-semibold">Fecha de Actualización</th>
              <th className="py-3 px-4 text-left text-pink-600 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inventario.map((item) => (
              <tr key={item.id} className="border-t border-pink-200">
                <td className="py-3 px-4">
                  {productos.find((producto) => producto.id === item.productoId)?.nombre}
                </td>
                <td className="py-3 px-4">{item.talla}</td>
                <td className="py-3 px-4">{item.cantidad}</td>
                <td className="py-3 px-4">{item.fechaActualizacion}</td>
                <td className="py-3 px-4 flex space-x-2">
                  {editInventarioId === item.id ? (
                    <>
                      <select
                        value={editInventario.productoId}
                        onChange={(e) => {
                          const selectedProduct = productos.find(p => p.id === parseInt(e.target.value));
                          setEditInventario({
                            ...editInventario,
                            productoId: selectedProduct.id,
                            talla: selectedProduct.talla
                          });
                        }}
                        className="p-2 border rounded-lg border-pink-400 focus:outline-none focus:border-pink-600"
                      >
                        {productos.map((producto) => (
                          <option key={producto.id} value={producto.id}>
                            {producto.nombre} - Talla: {producto.talla}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={editInventario.cantidad}
                        onChange={(e) => setEditInventario({ ...editInventario, cantidad: e.target.value })}
                        className="p-2 border rounded-lg border-pink-400 focus:outline-none focus:border-pink-600 mx-2"
                      />
                      <input
                        type="date"
                        value={editInventario.fechaActualizacion}
                        onChange={(e) => setEditInventario({ ...editInventario, fechaActualizacion: e.target.value })}
                        className="p-2 border rounded-lg border-pink-400 focus:outline-none focus:border-pink-600"
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300 ml-2"
                      >
                        Guardar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditInventario(item.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-300"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteInventario(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventarioCrud;
