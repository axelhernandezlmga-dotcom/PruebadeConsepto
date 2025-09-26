# Pedidos Express - Plataforma Fullstack estilo PedidosYa

Este repositorio contiene una aplicación fullstack que simula una plataforma de delivery moderna al estilo PedidosYa. El proyecto está dividido en dos carpetas principales:

- `backend/`: API REST construida con Node.js, Express, MongoDB y Socket.IO.
- `frontend/`: Interfaz web creada con React, Vite, React Router, TailwindCSS, Socket.IO Client y Leaflet.

## Características principales

- Registro e inicio de sesión con JWT.
- Exploración de locales gastronómicos por categoría, con descripciones, ratings y tiempos estimados de entrega.
- Visualización detallada del menú con imágenes y posibilidad de agregar productos al carrito.
- Checkout con métodos de pago simulados, cálculo de totales y dirección de entrega.
- Creación de pedidos con seguimiento en tiempo real, etapas dinámicas (Confirmado → Preparando → En camino → Entregado) y mapa con la ubicación del repartidor.
- Panel para clientes con historial de pedidos y actualización automática mediante websockets.
- Panel de administración general para gestionar usuarios, restaurantes y pedidos.
- Panel para locales asociados con administración de menú, asignación de repartidores y control de pedidos entrantes.
- Datos de prueba listos para sembrar en MongoDB.

## Requisitos previos

- Node.js 18+
- MongoDB en ejecución local o una URI compatible

## Configuración del backend

```bash
cd backend
cp .env.example .env # opcional si deseas crear el archivo de entorno
npm install
npm run seed   # Inserta los datos de prueba
npm run dev    # Inicia el servidor con nodemon en http://localhost:4000
```

Variables de entorno recomendadas (`.env`):

```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/pedidosya_clone
JWT_SECRET=tu_secreto_seguro
FRONTEND_URL=http://localhost:5173
```

## Configuración del frontend

```bash
cd frontend
npm install
npm run dev    # Inicia Vite en http://localhost:5173
```

El frontend está configurado para proxy inverso hacia `http://localhost:4000/api` durante el desarrollo.

## Usuarios de prueba

| Rol                | Email                 | Contraseña |
|--------------------|-----------------------|------------|
| Super Admin        | admin@delivery.com    | 123456     |
| Admin Pizzería     | pizza@delivery.com    | 123456     |
| Admin Hamburguesas | burger@delivery.com   | 123456     |
| Repartidor         | juan@delivery.com     | 123456     |
| Cliente            | carla@delivery.com    | 123456     |

> Los administradores de locales ya están vinculados a sus respectivos restaurantes en los datos de prueba.

## Funcionalidades destacadas

- **Seguimiento en tiempo real**: la API emite eventos Socket.IO cuando se crea o actualiza un pedido, permitiendo que la interfaz muestre el progreso sin recargar.
- **Mapa dinámico**: el componente `OrderTracker` usa Leaflet para mostrar la ubicación estimada del repartidor.
- **Administración completa**: paneles diferenciados para el super administrador y para los locales asociados, con formularios modernos y controles responsivos.

## Próximos pasos sugeridos

- Implementar edición/eliminación de productos desde el panel de socios.
- Integrar un proveedor real de mapas (Google Maps) y geolocalización en tiempo real.
- Añadir notificaciones push o emails para clientes y repartidores.

---

¡Disfrutá explorando y extendiendo la plataforma Pedidos Express! 🚀
