import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/productModel';
import BadRequestError from '../errors/errorClasses/badRequestError';
import NotFoundError from '../errors/errorClasses/notFoundError';
import InternalError from '../errors/errorClasses/internalError';

const placeOrder = async (req: Request, res: Response, next: NextFunction) => {
  const {
    total,
    items,
  } = req.body;

  try {
    const products = await Product.find({ _id: { $in: items } });
    const productIds = products.map((item) => item._id.toString());
    const invalidIds = items.filter((_id: string) => !productIds.includes(_id));
    const isPriceless = products.some((item) => !item.price);
    const sumProducts = products.reduce((sum, item) => sum + (item.price || 0), 0);

    if (products.length === 0) {
      return next(new NotFoundError('Products not found'));
    }

    if (invalidIds.length > 0) {
      return next(new BadRequestError('One or more products do not exist'));
    }

    if (isPriceless) {
      return next(new BadRequestError('One or more products have no price'));
    }

    if (sumProducts !== total) {
      return next(new BadRequestError('Sum of products does not equal total price'));
    }

    const response = {
      id: faker.string.nanoid(),
      total: sumProducts,
    };

    return res.status(201).send(response);
  } catch {
    return next(new InternalError('Internal server error'));
  }
};

export default placeOrder;
