import express from 'express';
import cors from 'cors';
import path from 'node:path';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import errorHandler from './middlewares/errorHandler';
import { errorLogger, requestLogger } from './middlewares/logger';

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use('/product', productRoutes);
app.use('/order', orderRoutes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {});
