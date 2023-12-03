import express from 'express';
import productControllers from '../controllers/productControllers';

const productRouter = express.Router();

// Top 5 products of the store
productRouter.get('/top5/products', productControllers.getTop5Products);

// Top 5 categories of the store
productRouter.get('/top5/categories', productControllers.getTop5Categories);

// Top 5 products of the store by category
productRouter.get('/top5/:category', productControllers.getTop5ProductsByCategory);

// A product of the store by category
productRouter.get('/:category/similar', productControllers.get5RandomProductsByCategory);

// A product of the store by ID
productRouter.get('/:id', productControllers.getProductByID);

// All products of the store
productRouter.get('/', productControllers.getAllProducts)

// A product of the store by category that is promoted (currently not in use)
productRouter.get('/:category/promoted', productControllers.getRandomProductByCategory);

export default productRouter