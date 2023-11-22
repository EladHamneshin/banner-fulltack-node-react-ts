import productsDal from "../dal/productsDal"
import { Category, Product } from "../types/interfaces/productInterfaces";

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
    const categories:Category[] = await productsDal.getAllCategoryNames().sort((a: Category, b: Category) => b.clicked - a.clicked);
    categories
    return categories.slice(0, 5);
};

const getTop5Products = async () => {
    const products = await productsDal.fetchAllProducts();
    products.sort((a: Product, b: Product) => b.click - a.click);
    return products.slice(0, 5);
};

export default { getAllProducts, getProductById, getProductByCategory, getAllCategoryNames, getProductByProductName };