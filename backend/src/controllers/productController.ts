import { NextFunction, Request, Response } from 'express';
import Product from '../models/productModel';
import ConflictError from '../errors/errorClasses/conflictError';
import BadRequestError from '../errors/errorClasses/badRequestError';
import NotFoundError from '../errors/errorClasses/notFoundError';
import InternalError from '../errors/errorClasses/internalError';

export const getAllProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return next(new NotFoundError('Products do not found'));
    }

    return res.send(products);
  } catch (error) {
    return next(new InternalError('Cannot get list of products'));
  }
};

export const createNewProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    image,
    category,
    description,
    price,
  } = req.body;

  const newProduct = new Product({
    title,
    image,
    category,
    description,
    price,
  });

  try {
    const createdProduct = await newProduct.save();
    return res.status(201).send(createdProduct);
  } catch (error) {
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError('Product with this title already exists'));
    }

    return next(new BadRequestError('Failed to create new product, check request data'));
  }
};
