import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './mongoDB/connection.js';
import indexRouter from './routes/indexRouter.js'
import 'dotenv/config';

const app = express();

connectDB();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', indexRouter)

const PORT = process.env.PUERTO;;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
