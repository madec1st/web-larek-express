import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/errorClasses/customError';

const errorHandler = (err: CustomError, _req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Internal Server Error' : err.message;
  res.status(statusCode).send({ message });
  next();
};

export default errorHandler;
