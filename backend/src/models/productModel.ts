import mongoose from 'mongoose';
import productSchema, { IProduct } from '../schemas/productSchema';

export default mongoose.model<IProduct>('product', productSchema);
