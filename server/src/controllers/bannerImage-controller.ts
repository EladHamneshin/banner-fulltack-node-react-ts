import { Request, Response, NextFunction } from "express";
import { ApiSuccess } from "../utils/ApiSucess";
import { asyncHandler } from "../middleware/async-middleware";
import { BannerInterface } from "../types/interfaces/bannerInterface";
import { ApiError } from "../utils/ApiError";
// import service from "../services/bannersImage-service";
import { errorResponse } from "../middleware/error-middleware";
import STATUS_CODES from "../utils/StatusCodes";



// Import service functions
import {
  getBannersImage as serviceGetBannersImage,
  getBannerImageByProductID as serviceGetBannersImageByProductID,
  getBannersImageByCategory as serviceGetBannersImageByCategory,
  getBannersImageByUser as serviceGetBannersImageByUser,
  updateBannerImage as serviceUpdateBannerImage,
  createBannerImage as serviceCreateBannerImage,
  deleteBannerImage as serviceDeleteBannerImage,
} from "../services/bannersImage-service";

// @desc   Get all bannersImage
// @route  GET /bannersImage
// @access Public
export const getBannersImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const banners: BannerInterface[] = await serviceGetBannersImage();

      if (!banners) {
        throw new ApiError({}, 500, "Something went wrong. Please try again.");
      }

      res.status(STATUS_CODES.OK).json({ success: true, data: banners, message: "Success!" });
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  }
);

// @desc   Get bannersImage by productID
// @route  GET /bannersImage/:productID
// @access Public
export const getBannersImageByProductID = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productID } = req.params;

    try {
      const banners: BannerInterface[] = await serviceGetBannersImageByProductID(productID);

      if (!banners) {
        throw new ApiError({}, STATUS_CODES.NO_CONTENT, "Banners not found for the given productID");
      }

      res.status(STATUS_CODES.OK).json({ success: true, data: banners, message: "Success!" });
    } catch (error) {
      next(error);
    }
  }
);

// @desc   Get bannersImage by category
// @route  GET /bannersImage/category/:categoryName
// @access Internal
export const getBannersImageByCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryName } = req.params;

    try {
      const banners: BannerInterface[] = await serviceGetBannersImageByCategory(categoryName);

      if (!banners) {
        throw new ApiError({}, STATUS_CODES.NOT_FOUND, "Banners not found for the given category");
      }

      res.status(STATUS_CODES.OK).json({ success: true, data: banners, message: "Success!" });
    } catch (error) {
      next(error);
    }
  }
);

// @desc   Get bannersImage by user
// @route  GET /bannersImage/user/:userID
// @access Internal
export const getBannersImageByUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;

    try {
      const banners: BannerInterface[] = await serviceGetBannersImageByUser(userID);

      if (!banners) {
        throw new ApiError({}, STATUS_CODES.NOT_FOUND, "Banners not found for the given user");
      }

      res.status(STATUS_CODES.OK).json({ success: true, data: banners, message: "Success!" });
    } catch (error) {
      next(error);
    }
  }
);

// @desc   Update bannerImage by bannerID
// @route  PUT /bannersImage/:bannerID
// @access Internal
export const updateBannerImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bannerID } = req.params;

    try {
      const updatedBanner: BannerInterface | null = await serviceUpdateBannerImage(bannerID, req.body);

      if (!updatedBanner) {
        throw new ApiError({}, STATUS_CODES.NOT_FOUND, "Banner not found for the given ID");
      }

      res.status(STATUS_CODES.OK).json({ success: true, data: updatedBanner, message: "Update successful!" });
    } catch (error) {
      next(error);
    }
  }
);

// @desc   Create bannerImage by productID
// @route  POST /bannersImage/:productID
// @access Internal
export const createBannerImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productID } = req.params;

    try {
      const newBanner: BannerInterface = await serviceCreateBannerImage(productID, req.body);

      res.status(STATUS_CODES.CREATED).json({ success: true, data: newBanner, message: "Creation successful!" });
    } catch (error) {
      next(error);
    }
  }
);

// @desc   Delete bannerImage by bannerID
// @route  DELETE /bannersImage/:bannerID
// @access Internal
export const deleteBannerImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bannerID } = req.params;

    try {
      const deletedBanner: BannerInterface | null = await serviceDeleteBannerImage(bannerID);

      if (!deletedBanner) {
        throw new ApiError({}, STATUS_CODES.NOT_FOUND, "Banner not found for the given ID");
      }

      res.status(STATUS_CODES.OK).json({ success: true, data: deletedBanner, message: "Deletion successful!" });
    } catch (error) {
      next(error);
    }
  }
);

