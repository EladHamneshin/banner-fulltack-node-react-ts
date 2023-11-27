import productsDal from "../dal/productsDal"
import { Category, Product } from "../types/interfaces/productInterfaces";
import { ApiError } from "../utils/ApiError";
import STATUS_CODES from "../utils/StatusCodes";

const getAllProducts = async () => {
    return await productsDal.fetchAllProducts();
};

const getProductById = async (id: string) => {
    return await productsDal.fetchProductById(id);
};

const getProductByCategory = async (category: string) => {
    return await productsDal.getProductByCategory(category);
};

const getAllCategoryNames = async () => {
    return await productsDal.getAllCategoryNames();
};

const getProductByProductName = async (product: string) => {
    return await productsDal.getProductByProductName(product);
};

const getTop5Categories = async () => {
    const categories = await productsDal.getAllCategoryNames();
    if(!categories)
        throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, 'No categories found');

    categories.sort((a: Category, b: Category) => b.clicked - a.clicked);
    return categories.slice(0, 5);
};

const getTop5Products = async () => {
    const products = await productsDal.fetchAllProducts();
    if (!products)
        throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');

    products.sort((a: Product, b: Product) => b.click - a.click);
    return products.slice(0, 5);
};

const getTop5ProductsByCategory = async (category: string) => {
    const products = await productsDal.getProductByCategory(category);
    if (!products)
        throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');

    products.sort((a: Product, b: Product) => b.click - a.click);
    return products.slice(0, 5);
};

const get5RandomProductsByCategory = async (category: string) => {
    const products = await productsDal.getProductByCategory(category);
    if (!products)
        return products;
    
    for (let i = 0; i < 5; i++) {
        const index = Math.floor(Math.random() * products.length);
        const temp = products[index];
        products.splice(index, 1);
        products.unshift(temp);
    };
    return products.slice(0, 5);
};

const getRandomProductByCategory = async (category: string) => {
    const products = await productsDal.getProductByCategory(category);
    if (!products)
        throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');
    
    return products[Math.floor(Math.random() * products.length)];
};

export default {
    getAllProducts,
    getProductById,
    getProductByCategory,
    getAllCategoryNames,
    getProductByProductName,
    getTop5Categories,
    getTop5Products,
    getTop5ProductsByCategory,
    get5RandomProductsByCategory,
    getRandomProductByCategory
};