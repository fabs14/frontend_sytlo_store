import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Roles from './Components/roles';
import UsuariosCrud from './Components/usuario';
import ProductosCrud from './Components/productos';
import CategoriasCrud from './Components/categorias';
import Login from './Components/login';
import InventarioCrud from './Components/inventarios';
import PermisosCrud from './Components/permisos';
import Navbar from './Components/navbar.jsx'

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar />

      <Routes>
       <Route path="/login" element={<Login/>}/>
        <Route path="/usuarios" element={<UsuariosCrud/>}/>
        <Route path="/roles" element={<Roles/>}/>
        <Route path="/productos" element={<ProductosCrud/>}/>
        <Route path="/categorias" element={<CategoriasCrud/>}/>
        <Route path="/inventario" element={<InventarioCrud/>}/>
        <Route path="/permisos" element={<PermisosCrud/>}/>
      </Routes>
      
   
    </div>
    </Router>
  );
}

export default App;
