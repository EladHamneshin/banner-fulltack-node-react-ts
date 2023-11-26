import { queryInterface } from "../types/interfaces/imageQueryInterface";
import { ApiError } from "../utils/ApiError";

import STATUS_CODES from "../utils/StatusCodes";


import { BannerInterface } from "../types/interfaces/bannerInterface";


import {
  getBannersImage as dalGetBannersImage,
  getBannersImageByProductID as dalGetBannersImageByProductID,
  getBannersImageByCategory as dalGetBannersImageByCategory,
  getBannersImageByUser as dalGetBannersImageByUser,
  updateBannerImage as dalUpdateBannerImage,
  createBannerImage as dalCreateBannerImage,
  deleteBannerImage as dalDeleteBannerImage,
  getBannerImageByQuery as dalGetBannerImageByQuery,
} from "../dal/bannersImage-dal";

// Function to get all bannersImage
export const getBannersImage = async (): Promise<BannerInterface[]> => {

  try {
    const banners: BannerInterface[] = await dalGetBannersImage();
    return banners;
  } catch (error) {
    throw new ApiError({ error }, STATUS_CODES.NOT_FOUND, "Banners not found faild in .service");
  }
};

// Function to get bannersImage by productID
export const getBannerImageByProductID = async (productID: string) => {
  const banners: BannerInterface[] = await dalGetBannersImageByProductID(productID);
  if (!banners) throw new ApiError({}, STATUS_CODES.NOT_FOUND, "Banners not found faild in .service");
  return banners;


};

// Function to get bannersImage by category
export const getBannersImageByCategory = async (categoryName: string): Promise<BannerInterface[]> => {
  try {
    const banners: BannerInterface[] = await dalGetBannersImageByCategory(categoryName);
    return banners;
  } catch (error) {
    throw new ApiError({ error }, STATUS_CODES.NOT_FOUND, "Banners not found faild in .service");
  }
};

// Function to get bannersImage by user
export const getBannersImageByUser = async (userID: string): Promise<BannerInterface[]> => {
  try {
    const banners: BannerInterface[] = await dalGetBannersImageByUser(userID);
    return banners;
  } catch (error) {
    throw new ApiError({ error }, STATUS_CODES.NOT_FOUND, "Banners not found faild in .service");
  }
};

// Function to update bannerImage by bannerID
export const updateBannerImage = async (bannerID: string, data: Partial<BannerInterface>): Promise<BannerInterface | null> => {
  try {
    const updatedBanner: BannerInterface | null = await dalUpdateBannerImage(bannerID, data);
    return updatedBanner;
  } catch (error) {
    throw new ApiError({ error }, STATUS_CODES.NOT_FOUND, "Banners not found faild in .service");
  }
};

// Function to create bannerImage by productID
export const createBannerImage = async (productID: string, data: Partial<BannerInterface>): Promise<BannerInterface> => {
  try {
    const newBanner: BannerInterface = await dalCreateBannerImage(productID, data);
    return newBanner;
  } catch (error) {
    throw new ApiError({ error }, STATUS_CODES.NOT_FOUND, "Banners not found faild in .service");
  }
};

// Function to delete bannerImage by bannerID
export const deleteBannerImage = async (bannerID: string): Promise<BannerInterface | null> => {
  try {
    const deletedBanner: BannerInterface | null = await dalDeleteBannerImage(bannerID);
    return deletedBanner;
  } catch (error) {
    throw new ApiError({ error }, STATUS_CODES.NOT_FOUND, "Banners not found faild in .service");
  }
};

export const getBannerImagesByQuery = async (queryObject: queryInterface): Promise<BannerInterface[]> => {
  if (!queryObject.limit || queryObject.size === 'homepage') queryObject.limit = '1';
  
  if (queryObject.size === "homepage") {
    const bannerArray: BannerInterface[] = [...await dalGetBannerImageByQuery({...queryObject,size: "allscreen" }),...await dalGetBannerImageByQuery({...queryObject,size:'side'}),...await dalGetBannerImageByQuery({...queryObject,size: 'top' })];
    if (bannerArray.length < 3) throw new ApiError({}, STATUS_CODES.NOT_FOUND, "One or more bannerImages not found");
    if (bannerArray.some(item => item instanceof Error)) throw new ApiError({ error: bannerArray.find(item => item instanceof Error) }, STATUS_CODES.BAD_GATEWAY, "One or more bannerImages not found");
    return bannerArray
  } else {
    const bannerImage: BannerInterface[] = await dalGetBannerImageByQuery(queryObject);
    if (bannerImage.length === 0) throw new ApiError({}, STATUS_CODES.NOT_FOUND, "BannerImage not found");
    if (bannerImage.some(item => item instanceof Error)) throw new ApiError({ error: bannerImage.find(item => item instanceof Error) }, STATUS_CODES.BAD_GATEWAY,"Error while fetching bannerImage");
    return bannerImage;
  }
}