import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Roles from './Components/roles';
import UsuariosCrud from './Components/usuario';
import ProductosCrud from './Components/productos';
import CategoriasCrud from './Components/categorias';
import Login from './Components/login';
import InventarioCrud from './Components/inventarios';
import PermisosCrud from './Components/permisos';
import Navbar from './Components/navbar.jsx';
import Delivery from './Components/delivery.jsx';
import DireccionDestino from './Components/direccionDestino.jsx';
import Sucursal from './Components/sucursal.jsx';
import Talla from './Components/talla.jsx';
import MetodoPago from './Components/metodopago.jsx';
import LandingPage from './Components/landingpage.jsx';
import RutaProtegida from './RutaProtegida';
import { AuthProvider } from './AuthContext';
import Logout from './Components/Logout'; // Importar el componente de Logout

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

// Nuevo componente para manejar la lógica de Navbar con useLocation
function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Mostrar Navbar solo si no estamos en la página de inicio */}
      {location.pathname !== '/' && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />  {/* Ruta para cerrar sesión */}

        {/* Rutas protegidas */}
        <Route path="/usuarios" element={<RutaProtegida><UsuariosCrud /></RutaProtegida>} />
        <Route path="/roles" element={<RutaProtegida><Roles /></RutaProtegida>} />
        <Route path="/productos" element={<RutaProtegida><ProductosCrud /></RutaProtegida>} />
        <Route path="/categorias" element={<RutaProtegida><CategoriasCrud /></RutaProtegida>} />
        <Route path="/inventario" element={<RutaProtegida><InventarioCrud /></RutaProtegida>} />
        <Route path="/permisos" element={<RutaProtegida><PermisosCrud /></RutaProtegida>} />
        <Route path="/delivery" element={<RutaProtegida><Delivery /></RutaProtegida>} />
        <Route path="/direccion" element={<RutaProtegida><DireccionDestino /></RutaProtegida>} />
        <Route path="/sucursal" element={<RutaProtegida><Sucursal /></RutaProtegida>} />
        <Route path="/talla" element={<RutaProtegida><Talla /></RutaProtegida>} />
        <Route path="/metodospago" element={<RutaProtegida><MetodoPago /></RutaProtegida>} />
      </Routes>
    </div>
  );
}

export default App;
