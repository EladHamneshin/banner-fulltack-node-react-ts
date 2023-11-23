import express from 'express';
import productControllers from '../controllers/productControllers';

const productRouter = express.Router();

productRouter.get('/top5/products',productControllers.getTop5Products);

productRouter.get('/top5/categories',productControllers.getTop5Categories);

productRouter.get('/top5/:category',productControllers.getTop5ProductsByCategory);

productRouter.get('/:category/similar',productControllers.get5RandomProductsByCategory);

productRouter.get('/:category/promoted',productControllers.getRandomProductByCategory)

export default productRouter