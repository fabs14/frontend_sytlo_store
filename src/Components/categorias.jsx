import React, { useState } from 'react';

const CategoriasCrud = () => {
  const [categorias, setCategorias] = useState([
    { id: 1, nombre: 'Polera' },
    { id: 2, nombre: 'Pantalon' },
    { id: 3, nombre: 'Top' },
    { id: 4, nombre: 'Falda' }
  ]);

  const [newCategoria, setNewCategoria] = useState('');
  const [editCategoriaId, setEditCategoriaId] = useState(null);
  const [editCategoriaNombre, setEditCategoriaNombre] = useState('');

  const handleAddCategoria = () => {
    if (newCategoria.trim()) {
      setCategorias([...categorias, { id: categorias.length + 1, nombre: newCategoria }]);
      setNewCategoria('');
    }
  };

  const handleEditCategoria = (id) => {
    const categoriaToEdit = categorias.find((categoria) => categoria.id === id);
    setEditCategoriaId(id);
    setEditCategoriaNombre(categoriaToEdit.nombre);
  };

  const handleSaveEdit = () => {
    setCategorias(categorias.map((categoria) => 
      (categoria.id === editCategoriaId ? { ...categoria, nombre: editCategoriaNombre } : categoria)
    ));
    setEditCategoriaId(null);
    setEditCategoriaNombre('');
  };

  const handleDeleteCategoria = (id) => {
    setCategorias(categorias.filter((categoria) => categoria.id !== id));
  };

  return (
    <div className="bg-pink-50 min-h-screen p-8 font-sans">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Gestión de Categorías</h2>
      
      <div className="mb-4 flex justify-center items-center">
        <input
          type="text"
          value={newCategoria}
          onChange={(e) => setNewCategoria(e.target.value)}
          placeholder="Nueva Categoría"
          className="p-2 rounded-l-lg border border-pink-400 focus:outline-none focus:border-pink-600"
        />
        <button
          onClick={handleAddCategoria}
          className="bg-pink-500 text-white px-4 py-2 rounded-r-lg hover:bg-pink-600 transition duration-300"
        >
          Agregar Categoría
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-pink-200 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-pink-100">
              <th className="py-3 px-4 text-left text-pink-600 font-semibold">ID</th>
              <th className="py-3 px-4 text-left text-pink-600 font-semibold">Nombre</th>
              <th className="py-3 px-4 text-left text-pink-600 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id} className="border-t">
                <td className="py-3 px-4">{categoria.id}</td>
                <td className="py-3 px-4">
                  {editCategoriaId === categoria.id ? (
                    <input
                      type="text"
                      value={editCategoriaNombre}
                      onChange={(e) => setEditCategoriaNombre(e.target.value)}
                      className="p-2 border rounded-lg border-pink-400 focus:outline-none focus:border-pink-600"
                    />
                  ) : (
                    categoria.nombre
                  )}
                </td>
                <td className="py-3 px-4">
                  {editCategoriaId === categoria.id ? (
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300 mr-2"
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditCategoria(categoria.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300 mr-2"
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteCategoria(categoria.id)}
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

export default CategoriasCrud;
