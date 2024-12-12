import { Schema } from 'mongoose';

export interface IProduct {
  title: string;
  image: {
    fileName: string,
    originalName: string;
  };
  category: string;
  description: string;
  price: number;
}

export default new Schema<IProduct>({
  title: {
    type: String,
    required: [true, '`Title` is required field'],
    minlength: [2, 'Min value is 2 symbols'],
    maxlength: [30, 'Max value is 30 symbols'],
    unique: true,
  },
  image: {
    type: {
      fileName: {
        type: String,
        required: [true, '`fileName` is required field'],
      },
      originalName: {
        type: String,
        required: [true, '`originalName` is required field'],
      },
    },
    required: [true, '`Image` is required field'],
  },
  category: {
    type: String,
    required: [true, '`Category` is required field'],
  },
  description: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    default: null,
  },
});
