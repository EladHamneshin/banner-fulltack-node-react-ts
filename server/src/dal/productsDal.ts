import { ApiError } from "../utils/ApiError";
import STATUS_CODES from "../utils/StatusCodes";

const fetchAllProducts = async () => {
    try {

        const response = await fetch(`${process.env.ERP_BASE_URL}/shopInventory/`);

        if (!response.ok)
            throw new ApiError( response , STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');

        const data = await response.json();
        return data;
    } catch (error) {
        throw new ApiError( error , STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');
    };
};

const fetchProductById = async (id: string) => {
    try {
        const response = await fetch(`${process.env.ERP_BASE_URL}/shopInventory/${id}`);
        if (!response.ok)
            throw new ApiError( response , STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');

        const data = await response.json();
        return data;
    } catch (err) {
        throw new ApiError( err , STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');
    };
};

const getProductByCategory = async (category: string) => {
    try {
        const response = await fetch(`${process.env.ERP_BASE_URL}/shopInventory?category=${category}`);
        if (!response.ok)
            throw new ApiError( response , STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');

        const data = await response.json();
        return data;
    } catch (error) {
        throw new ApiError( error , STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }
};

const getAllCategoryNames = async () => {
    try {
        const response = await fetch(`${process.env.ERP_BASE_URL}/shopInventory/categories`);
        if (!response.ok)
            throw new ApiError( response , STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');

        const data = await response.json();
        return data;
    } catch (err) {
        throw new ApiError( err , STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');
    };
};

const getProductByProductName = async (product: string) => {
    try {
        const response = await fetch(`${process.env.ERP_BASE_URL}/shopInventory?search=${product}`);
        if (!response.ok)
            throw new ApiError( response , STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');

        const data = await response.json();
        return data;
    } catch (err) {
        throw new ApiError( err , STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');
    };

};

export default {
    fetchAllProducts,
    fetchProductById,
    getProductByCategory,
    getAllCategoryNames,
    getProductByProductName
};

