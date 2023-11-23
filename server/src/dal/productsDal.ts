import { ApiError } from "../utils/ApiError";
import STATUS_CODES from "../utils/StatusCodes";

const fetchAllProducts = async () => {
    const response = await fetch(`${process.env.ERP_BASE_URL}/api/shopInventory/`);
    
    if (!response.ok)
        throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');

    const data = await response.json();    
    return data;
};

const fetchProductById = async (id: string) => {
    const response = await fetch(`${process.env.ERP_BASE_URL}/api/shopInventory/${id}`);
    if (!response.ok)
        throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');

    const data = await response.json();
    return data;
};

const getProductByCategory = async (category: string) => {
    const response = await fetch(`${process.env.ERP_BASE_URL}/api/shopInventory?category=${category}`);
    if (!response.ok)
        throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');

    const data = await response.json();
    return data;
};

const getAllCategoryNames = async () => {
    const response = await fetch(`${process.env.ERP_BASE_URL}/api/shopInventory/categories`);
    if (!response.ok)
        throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');

    const data = await response.json();
    return data;
};

const getProductByProductName = async (product: string) => {
    const response = await fetch(`${process.env.ERP_BASE_URL}/api/shopInventory?search=${product}`);
    if (!response.ok)
        throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');

    const data = await response.json();
    return data;
};

export default {
    fetchAllProducts,
    fetchProductById,
    getProductByCategory,
    getAllCategoryNames,
    getProductByProductName
};

