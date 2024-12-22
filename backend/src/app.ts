import express from 'express';
import cors from 'cors';
import path from 'node:path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import errorHandler from './middlewares/errorHandler';
import { errorLogger, requestLogger } from './middlewares/logger';
import NotFoundError from './errors/errorClasses/notFoundError';

dotenv.config();
const app = express();

const {
  PORT = 3000,
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek',
} = process.env;

mongoose.connect(DB_ADDRESS);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('*', (_req, _res, next) => {
  next(new NotFoundError('This page does not exist'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {});
