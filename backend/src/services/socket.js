import { Server } from 'socket.io';

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  });

  io.on('connection', (socket) => {
    console.log('Cliente conectado al socket', socket.id);
    socket.on('disconnect', () => console.log('Cliente desconectado', socket.id));
  });

  return io;
};

export const socketServer = {
  emit: (...args) => io && io.emit(...args)
};
