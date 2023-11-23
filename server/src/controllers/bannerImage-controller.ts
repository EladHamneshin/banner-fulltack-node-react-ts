import { Request, Response, NextFunction } from "express";
import { ApiSuccess } from "../utils/ApiSucess";
import { asyncHandler } from "../middleware/async-middleware";
import {BannerInterface} from "../types/interfaces/bannerInterface";
import { ApiError } from "../utils/ApiError";
import service from "../services/bannersImage-service";
import { errorResponse } from "../middleware/error-middleware";
import STATUS_CODES from "../utils/StatusCodes";




export const getBannersImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const banners : BannerInterface[] = await service.getBannersImage();
    
    if (!banners) { throw new ApiError({}, 500, "Something went wrong .... Please try again") }
    res.status(STATUS_CODES.OK).json(new ApiSuccess<BannerInterface[]>(banners, "Success!"));
  },
);



// ? asyncHandler should be used for every request for easy async handling
export const errorUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Return json with error message and empty data
    throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, "Handled by asyncHandler")
  },
);
