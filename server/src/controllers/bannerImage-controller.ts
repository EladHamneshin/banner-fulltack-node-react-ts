import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/async-middleware.js";
import { BannerInterface } from "../types/interfaces/bannerInterface.js";
import { ApiError } from "../utils/ApiError.js";
import STATUS_CODES from "../utils/StatusCodes.js";

// Import service functions
import {
  getBannersImage as serviceGetBannersImage,
  getBannerImageByProductID as serviceGetBannersImageByProductID,
  getBannersImageByCategory as serviceGetBannersImageByCategory,
  getBannersImageByUser as serviceGetBannersImageByUser,
  updateBannerImage as serviceUpdateBannerImage,
  createBannerImage as serviceCreateBannerImage,
  deleteBannerImage as serviceDeleteBannerImage,
  getBannerImagesByQuery as serviceGetBannerImageByQuery,
  getTop5BannersImages as serviceGetTop5BannersImages,
} from "../services/bannersImage-service.js";

// @desc   Get all bannersImage
// @route  GET /bannersImage
// @access Public
export const getBannersImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const banners: BannerInterface[] = await serviceGetBannersImage();
    if (!banners) { throw new ApiError({}, 500, "Something went wrong. Please try again, stack:3") }

    res.status(STATUS_CODES.OK).json({ success: true, data: banners, message: "Success!" });
  }
);

// @desc   Get bannersImage by productID
// @route  GET /bannersImage/:productID
// @access Public
export const getBannersImageByProductID = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productID } = req.params;
    const banners: BannerInterface[] = await serviceGetBannersImageByProductID(productID);

    if (!banners) { throw new ApiError({}, 500, "Something went wrong. Please try again, stack:3") };

    res.status(STATUS_CODES.OK).json({ success: true, data: banners, message: "Success!" });

  }
);

// @desc   Get bannersImage by category
// @route  GET /bannersImage/category/:categoryName
// @access Internal
export const getBannersImageByCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryName } = req.params;
    const banners: BannerInterface[] = await serviceGetBannersImageByCategory(categoryName);

    if (!banners) { throw new ApiError({}, 500, "Something went wrong. Please try again, stack:3") };

    res.status(STATUS_CODES.OK).json({ success: true, data: banners, message: "Success!" });
  }
);

// @desc   Get bannersImage by user
// @route  GET /bannersImage/user/:userID
// @access Internal
export const getBannersImageByUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const banners: BannerInterface[] = await serviceGetBannersImageByUser(userID);

    if (!banners) { throw new ApiError({}, 500, "Something went wrong. Please try again, stack:3") };

    res.status(STATUS_CODES.OK).json({ success: true, data: banners, message: "Success!" });
  }
);

// @desc   Update bannerImage by bannerID
// @route  PUT /bannersImage/:bannerID
// @access Internal
export const updateBannerImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bannerID } = req.params;
    const updatedBanner: BannerInterface | null = await serviceUpdateBannerImage(bannerID, req.body);

    if (!updatedBanner) { throw new ApiError({}, 500, "Something went wrong. Please try again, stack:3") };

    res.status(STATUS_CODES.OK).json({ success: true, data: updatedBanner, message: "Update successful!" });
  }
);

// @desc   Create bannerImage by productID
// @route  POST /bannersImage/:productID
// @access Internal
export const createBannerImage = asyncHandler(
  async (req: Request, res: Response) => {
    const { productID } = req.params;
    const newBanner: BannerInterface = await serviceCreateBannerImage(productID, req.body, req.userID);

    if (!newBanner) { throw new ApiError({}, 500, "Something went wrong. Please try again, stack:3") };

    res.status(STATUS_CODES.CREATED).json({ success: true, data: newBanner, message: "Creation successful!" });
  }
);

// @desc   Delete bannerImage by bannerID
// @route  DELETE /bannersImage/:bannerID
// @access Internal
export const deleteBannerImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bannerID } = req.params;
    const deletedBanner: BannerInterface | null = await serviceDeleteBannerImage(bannerID);

    if (!deletedBanner) { throw new ApiError({}, 500, "Something went wrong. Please try again, stack:3") };

    res.status(STATUS_CODES.OK).json({ success: true, data: deletedBanner, message: "Deletion successful!" });
  }
);

// @desc Get top 5 clicked bannersImages
// @route GET /bannersImage/top5
// @access public
export const getTop5BannersImages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const banners:BannerInterface[] = await serviceGetTop5BannersImages();
    if (!banners) { throw new ApiError({}, 500, "Something went wrong. Please try again, stack:3") }

    res.status(STATUS_CODES.OK).json({ success: true, data: banners, message: "Success!" });
  });




export const getBannerImagesByQuery = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { size } = req.query;
    if (!size) throw new ApiError({}, STATUS_CODES.BAD_REQUEST, "Size is required");

    const response = await serviceGetBannerImageByQuery(req.query);

    res.status(STATUS_CODES.OK).json({ success: true, data: response, message: "Success!" });
  });
