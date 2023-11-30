import mongoose from 'mongoose';
import 'dotenv/config';

const connection = process.env.MONGO_ATLAS_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(connection);
        console.log('Conectado a la base de datos de MongoDB!!');
    } catch (error) {
        console.error('Error de conexión:', error.message);
        process.exit(1); 
    }
};

export default connectDB;
