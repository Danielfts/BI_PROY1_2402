import React from 'react';
import { createRoot } from 'react-dom/client'; // Importar createRoot
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const container = document.getElementById('root'); // Obtén el contenedor
const root = createRoot(container); // Crea la raíz


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

