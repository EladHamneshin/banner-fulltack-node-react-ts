import { asyncHandler } from "../middleware/async-middleware";
import productService from "../services/productService";
import { Request, Response, NextFunction } from "express";
import { Category, Product } from "../types/interfaces/productInterfaces";
import { ApiError } from "../utils/ApiError";
import { ApiSuccess } from "../utils/ApiSucess";
import STATUS_CODES from "../utils/StatusCodes";


const getTop5Categories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const top5Categories = await productService.getTop5Categories();

    if (!top5Categories) { throw new ApiError({}, 500, "Something went wrong .... Please try again") };
    res.status(STATUS_CODES.OK).json(new ApiSuccess<Category[]>(top5Categories, 'success!'));
});

const getTop5Products = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const top5Products = await productService.getTop5Products();

    if (!top5Products) { throw new ApiError({}, 500, "Something went wrong .... please try again") };
    res.status(STATUS_CODES.OK).json(new ApiSuccess<Product[]>(top5Products, 'success'));
});

const getTop5ProductsByCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.params;
    const top5ProductsByCategory = await productService.getTop5ProductsByCategory(category);

    if (!top5ProductsByCategory) { throw new ApiError({}, 500, "Something went wrong .... please try again") };
    res.status(STATUS_CODES.OK).json(new ApiSuccess<Product[]>(top5ProductsByCategory, 'success'));
});

const get5RandomProductsByCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.params;
    const random5ProductsByCategory = await productService.get5RandomProductsByCategory(category);

    if (!random5ProductsByCategory) throw new ApiError({}, 500, "Something went wrong .... please try again");
    res.status(STATUS_CODES.OK).send(new ApiSuccess<Product[]>(random5ProductsByCategory, 'success'));
});

const getRandomProductByCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.params;
    const randomProductByCategory = await productService.getRandomProductByCategory(category);

    if (!randomProductByCategory) throw new ApiError({}, 500, "Something went wrong.... please try again");
    res.status(STATUS_CODES.OK).send(new ApiSuccess<Product>(randomProductByCategory,'success'));
});



export default {
    getTop5Categories,
    getTop5Products,
    get5RandomProductsByCategory,
    getTop5ProductsByCategory,
    getRandomProductByCategory
};