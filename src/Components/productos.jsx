import React, { useState } from 'react';

const ProductosCrud = () => {
  const categorias = ['Polera', 'Pantalon', 'Top', 'Falda'];

  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Polera Roja', descripcion: 'Polera de algodón', talla: 'M', categoria: 'Polera' },
    { id: 2, nombre: 'Pantalon Jeans', descripcion: 'Jeans azul', talla: '32', categoria: 'Pantalon' },
    { id: 3, nombre: 'Top Blanco', descripcion: 'Top de verano', talla: 'S', categoria: 'Top' },
    { id: 4, nombre: 'Falda Negra', descripcion: 'Falda elegante', talla: 'L', categoria: 'Falda' },
    { id: 5, nombre: 'Polera Verde', descripcion: 'Polera básica', talla: 'L', categoria: 'Polera' },
    { id: 6, nombre: 'Pantalon Chino', descripcion: 'Pantalón casual', talla: '30', categoria: 'Pantalon' },
    { id: 7, nombre: 'Top Rojo', descripcion: 'Top ajustado', talla: 'M', categoria: 'Top' },
    { id: 8, nombre: 'Falda Azul', descripcion: 'Falda casual', talla: 'M', categoria: 'Falda' },
    { id: 9, nombre: 'Polera Negra', descripcion: 'Polera básica negra', talla: 'S', categoria: 'Polera' },
    { id: 10, nombre: 'Pantalon Cargo', descripcion: 'Pantalón de carga', talla: '34', categoria: 'Pantalon' },
    { id: 11, nombre: 'Top Verde', descripcion: 'Top sin mangas', talla: 'L', categoria: 'Top' },
    { id: 12, nombre: 'Falda Roja', descripcion: 'Falda larga', talla: 'S', categoria: 'Falda' },
    { id: 13, nombre: 'Polera Blanca', descripcion: 'Polera básica blanca', talla: 'M', categoria: 'Polera' },
    { id: 14, nombre: 'Pantalon Deportivo', descripcion: 'Pantalón para hacer deporte', talla: 'M', categoria: 'Pantalon' },
    { id: 15, nombre: 'Top Negro', descripcion: 'Top elegante', talla: 'S', categoria: 'Top' },
  ]);

  const [newProducto, setNewProducto] = useState({ nombre: '', descripcion: '', talla: '', categoria: categorias[0] });
  const [editProductoId, setEditProductoId] = useState(null);
  const [editProducto, setEditProducto] = useState({ nombre: '', descripcion: '', talla: '', categoria: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddProducto = () => {
    if (newProducto.nombre.trim() && newProducto.descripcion.trim()) {
      setProductos([...productos, { id: productos.length + 1, ...newProducto }]);
      setNewProducto({ nombre: '', descripcion: '', talla: '', categoria: categorias[0] });
    }
  };

  const handleEditProducto = (id) => {
    const productoToEdit = productos.find((producto) => producto.id === id);
    setEditProductoId(id);
    setEditProducto(productoToEdit);
  };

  const handleSaveEdit = () => {
    setProductos(
      productos.map((producto) =>
        producto.id === editProductoId ? { ...producto, ...editProducto } : producto
      )
    );
    setEditProductoId(null);
    setEditProducto({ nombre: '', descripcion: '', talla: '', categoria: '' });
  };

  const handleDeleteProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  // Función para filtrar productos según el término de búsqueda
  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-pink-50 min-h-screen p-8 font-sans">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Gestión de Productos</h2>

      {/* Campo de búsqueda */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar producto por nombre o descripción"
          className="p-2 border border-pink-400 rounded-lg focus:outline-none focus:border-pink-600"
        />
      </div>

      <div className="mb-4 flex justify-center items-center">
        <input
          type="text"
          value={newProducto.nombre}
          onChange={(e) => setNewProducto({ ...newProducto, nombre: e.target.value })}
          placeholder="Nombre del Producto"
          className="p-2 rounded-l-lg border border-pink-400 focus:outline-none focus:border-pink-600"
        />
        <input
          type="text"
          value={newProducto.descripcion}
          onChange={(e) => setNewProducto({ ...newProducto, descripcion: e.target.value })}
          placeholder="Descripción"
          className="p-2 border border-pink-400 focus:outline-none focus:border-pink-600 mx-2"
        />
        <input
          type="text"
          value={newProducto.talla}
          onChange={(e) => setNewProducto({ ...newProducto, talla: e.target.value })}
          placeholder="Talla"
          className="p-2 border border-pink-400 focus:outline-none focus:border-pink-600 mx-2"
        />
        <select
          value={newProducto.categoria}
          onChange={(e) => setNewProducto({ ...newProducto, categoria: e.target.value })}
          className="p-2 rounded-r-lg border border-pink-400 focus:outline-none focus:border-pink-600"
        >
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddProducto}
          className="bg-pink-500 text-white px-4 py-2 ml-4 rounded-lg hover:bg-pink-600 transition duration-300"
        >
          Agregar Producto
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-pink-200 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-pink-100">
              <th className="py-3 px-4 text-left text-pink-600 font-semibold">ID</th>
              <th className="py-3 px-4 text-left text-pink-600 font-semibold">Nombre</th>
              <th className="py-3 px-4 text-left text-pink-600 font-semibold">Descripción</th>
              <th className="py-3 px-4 text-left text-pink-600 font-semibold">Talla</th>
              <th className="py-3 px-4 text-left text-pink-600 font-semibold">Categoría</th>
              <th className="py-3 px-4 text-left text-pink-600 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.map((producto) => (
              <tr key={producto.id} className="border-t">
                <td className="py-3 px-4">{producto.id}</td>
                <td className="py-3 px-4">
                  {editProductoId === producto.id ? (
                    <input
                      type="text"
                      value={editProducto.nombre}
                      onChange={(e) => setEditProducto({ ...editProducto, nombre: e.target.value })}
                      className="p-2 border rounded-lg border-pink-400 focus:outline-none focus:border-pink-600"
                    />
                  ) : (
                    producto.nombre
                  )}
                </td>
                <td className="py-3 px-4">
                  {editProductoId === producto.id ? (
                    <input
                      type="text"
                      value={editProducto.descripcion}
                      onChange={(e) => setEditProducto({ ...editProducto, descripcion: e.target.value })}
                      className="p-2 border rounded-lg border-pink-400 focus:outline-none focus:border-pink-600"
                    />
                  ) : (
                    producto.descripcion
                  )}
                </td>
                <td className="py-3 px-4">
                  {editProductoId === producto.id ? (
                    <input
                      type="text"
                      value={editProducto.talla}
                      onChange={(e) => setEditProducto({ ...editProducto, talla: e.target.value })}
                      className="p-2 border rounded-lg border-pink-400 focus:outline-none focus:border-pink-600"
                    />
                  ) : (
                    producto.talla
                  )}
                </td>
                <td className="py-3 px-4">
                  {editProductoId === producto.id ? (
                    <select
                      value={editProducto.categoria}
                      onChange={(e) => setEditProducto({ ...editProducto, categoria: e.target.value })}
                      className="p-2 border rounded-lg border-pink-400 focus:outline-none focus:border-pink-600"
                    >
                      {categorias.map((categoria) => (
                        <option key={categoria} value={categoria}>
                          {categoria}
                        </option>
                      ))}
                    </select>
                  ) : (
                    producto.categoria
                  )}
                </td>
                <td className="py-3 px-4">
                  {editProductoId === producto.id ? (
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300 mr-2"
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditProducto(producto.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300 mr-2"
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteProducto(producto.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductosCrud;
