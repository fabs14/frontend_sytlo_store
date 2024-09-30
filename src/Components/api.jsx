import axios from 'axios';

// Crear la instancia de axios
const api = axios.create({
  baseURL: 'https://backend-production-ad5c.up.railway.app/api', // Asegúrate de tener la URL correcta
});

// Interceptor para agregar el token JWT a las cabeceras de cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtener el token de localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agregar el token en la cabecera de autorización
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
