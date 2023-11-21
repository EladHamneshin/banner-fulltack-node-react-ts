import { Request, Response, NextFunction } from "express";
import { ApiSuccess } from "../utils/ApiSucess";
import { asyncHandler } from "../middleware/async-middleware";
import {BannerInterface} from "../types/interfaces/BannerInterface";
import { ApiError } from "../utils/ApiError";
import service from "../services/bannersImage-service";
import { errorResponse } from "../middleware/error-middleware";
import STATUS_CODES from "../utils/StatusCodes";
import generateToken from "../utils/generateToken";




// export const getBannersImage = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const banners : BannerInterface[] = await service.getBannersImage();
    
//     if (!banners) { throw new ApiError({}, 500, "Something went wrong .... Please try again") }
//     res.status(STATUS_CODES.OK).json(new ApiSuccess<BannerInterface[]>(banners, "Success!"));
//   },
// );


// קבלת כל הבאנרים מהסוג
export const getBannersImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const banners: BannerInterface[] = await service.getBannersImage();

    if (!banners) {
      throw new ApiError({}, 500, "משהו השתבש.... בבקשה נסה שוב");
    }
    res.status(STATUS_CODES.OK).json(new ApiSuccess<BannerInterface[]>(banners, "הצלחה!"));
  },
);

// קבלת באנר על פי ID של המוצר
export const getBannersImageByProductID = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productID } = req.params;
    const banners: BannerInterface[] = await service.getBannersImageByProductID(productID);

    if (!banners) {
      throw new ApiError({}, 500, "משהו השתבש.... בבקשה נסה שוב");
    }
    res.status(STATUS_CODES.OK).json(new ApiSuccess<BannerInterface[]>(banners, "הצלחה!"));
  },
);

// קבלת באנרים על פי קטגוריה
export const getBannersImageByCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryName } = req.params;
    const banners: BannerInterface[] = await service.getBannersImageByCategory(categoryName);

    if (!banners) {
      throw new ApiError({}, 500, "משהו השתבש.... בבקשה נסה שוב");
    }
    res.status(STATUS_CODES.OK).json(new ApiSuccess<BannerInterface[]>(banners, "הצלחה!"));
  },
);

// קבלת באנרים של המשתמש הנוכחי
export const getBannersImageByUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // ייתכן שתצטרך לחלץ מידע על המשתמש מהבקשה או להשתמש בטוקן
    const userId = req.user?.id; // בהנחה שמזהה המשתמש נשמר ב req.user

    const banners: BannerInterface[] = await service.getBannersImageByUser(userId);

    if (!banners) {
      throw new ApiError({}, 500, "משהו השתבש.... בבקשה נסה שוב");
    }
    res.status(STATUS_CODES.OK).json(new ApiSuccess<BannerInterface[]>(banners, "הצלחה!"));
  },
);

// עדכון של באנר על פי ID
export const updateBannerImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bannerID } = req.params;
    const updatedBanner: BannerInterface = await service.updateBannerImage(bannerID, req.body);

    if (!updatedBanner) {
      throw new ApiError({}, 500, "משהו השתבש.... בבקשה נסה שוב");
    }
    res.status(STATUS_CODES.OK).json(new ApiSuccess<BannerInterface>(updatedBanner, "הצלחה!"));
  },
);

// יצירת באנר חדש
export const createBannerImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productID } = req.params;
    const newBanner: BannerInterface = await service.createBannerImage(productID, req.body);

    if (!newBanner) {
      throw new ApiError({}, 500, "משהו השתבש.... בבקשה נסה שוב");
    }
    res.status(STATUS_CODES.OK).json(new ApiSuccess<BannerInterface>(newBanner, "הצלחה!"));
  },
);

// מחיקת באנר על פי ID
export const deleteBannerImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bannerID } = req.params;
    const success: boolean = await service.deleteBannerImage(bannerID);

    if (!success) {
      throw new ApiError({}, 500, "משהו השתבש.... בבקשה נסה שוב");
    }
    res.status(STATUS_CODES.OK).json(new ApiSuccess<boolean>(success, "הצלחה!"));
  },
);



// ? asyncHandler should be used for every request for easy async handling
export const errorUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Return json with error message and empty data
    throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, "Handled by asyncHandler")
  },
);
