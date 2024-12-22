import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import Product from '../models/productModel';
import ConflictError from '../errors/errorClasses/conflictError';
import BadRequestError from '../errors/errorClasses/badRequestError';

export const getAllProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(200).send({ message: 'Products do not found', products: [] });
    }

    return res.send(products);
  } catch (error) {
    return next(error);
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

    if (error instanceof Error.ValidationError) {
      return next(new BadRequestError(`Validation error: ${error.message} `));
    }

    return next(error);
  }
};
