import mongoose from 'mongoose';

export const connectDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pedidosya_clone';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`📦 Conectado a MongoDB en ${mongoUri}`);
  } catch (error) {
    console.error('Error conectando a MongoDB', error);
    process.exit(1);
  }
};
