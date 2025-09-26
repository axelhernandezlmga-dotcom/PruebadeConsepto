import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { connectDatabase } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { initSocket } from './services/socket.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
initSocket(server);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API PedidosYa Clone funcionando' });
});

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 4000;

connectDatabase().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
  });
});
