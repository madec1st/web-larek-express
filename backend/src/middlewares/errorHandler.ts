import { Request, Response } from 'express';
import BadRequestError from '../errors/errorClasses/badRequestError';
import NotFoundError from '../errors/errorClasses/notFoundError';
import ConflictError from '../errors/errorClasses/conflictError';

const errorHandler = (err: Error, _req: Request, res: Response) => {
  if (err instanceof BadRequestError) {
    return res.status(400).json({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }
  if (err instanceof ConflictError) {
    return res.status(409).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
