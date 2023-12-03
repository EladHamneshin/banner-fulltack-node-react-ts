import { queryInterface } from "../types/interfaces/imageQueryInterface";
import { ApiError } from "../utils/ApiError";
import STATUS_CODES from "../utils/StatusCodes";
import { BannerInterface } from "../types/interfaces/bannerInterface";
import {
  getAllBannersImages as dalGetBannersImage,
  getBannersImageByProductID as dalGetBannersImageByProductID,
  getBannersImagesByCategory as dalGetBannersImageByCategory,
  getBannersImagesByUser as dalGetBannersImageByUser,
  updateBannerImage as dalUpdateBannerImage,
  createBannerImage as dalCreateBannerImage,
  deleteBannerImage as dalDeleteBannerImage,
  getBannerImageByQuery as dalGetBannerImageByQuery,
} from "../dal/bannersImage-dal";

// Function to get all bannersImage
export const getBannersImage = async (): Promise<BannerInterface[]> => {
  const banners: BannerInterface[] = await dalGetBannersImage();
  if (banners.length === 0) throw new ApiError({}, STATUS_CODES.NOT_FOUND, "No banners found, stack:2");
  return banners;
};

// Function to get bannersImage by productID
export const getBannerImageByProductID = async (productID: string) => {
  const banners: BannerInterface[] = await dalGetBannersImageByProductID(productID);
  // if (banners.length === 0) throw new ApiError({}, STATUS_CODES.NOT_FOUND, "No banners found for this productID, stack:2");
  return banners;
};

// Function to get bannersImage by category
export const getBannersImageByCategory = async (categoryName: string): Promise<BannerInterface[]> => {
  const banners: BannerInterface[] = await dalGetBannersImageByCategory(categoryName);
  // if (banners.length === 0) throw new ApiError({}, STATUS_CODES.NOT_FOUND, "No banners found for this category, stack:2");
  return banners;
};

// Function to get bannersImage by user
export const getBannersImageByUser = async (userID: string): Promise<BannerInterface[]> => {
  const banners: BannerInterface[] = await dalGetBannersImageByUser(userID);
  // if (banners.length === 0) throw new ApiError({}, STATUS_CODES.NOT_FOUND, "No banners found for this userID, stack:2");
  return banners;
};

// Function to update bannerImage by bannerID
export const updateBannerImage = async (bannerID: string, data: Partial<BannerInterface>): Promise<BannerInterface | null> => {
  const updatedBanner: BannerInterface | null = await dalUpdateBannerImage(bannerID, data);
  if (!updatedBanner) throw new ApiError({}, STATUS_CODES.NOT_FOUND, "No banner found for this bannerID, stack:2");
  return updatedBanner;
};

// Function to create bannerImage by productID

export const createBannerImage = async (productID: string, data: Partial<BannerInterface>,userID:string): Promise<BannerInterface> => {
  return await dalCreateBannerImage(productID,data,userID);
 };


// Function to delete bannerImage by bannerID
export const deleteBannerImage = async (bannerID: string): Promise<BannerInterface | null> => {
  const deletedBanner: BannerInterface | null = await dalDeleteBannerImage(bannerID);
  if (!deletedBanner) throw new ApiError({}, STATUS_CODES.NOT_FOUND, "No banner found for this bannerID, stack:2");
  return deletedBanner;
};

export const getBannerImagesByQuery = async (queryObject: queryInterface): Promise<BannerInterface[]> => {
  if (!queryObject.limit || queryObject.size === 'homepage') queryObject.limit = '1';
  queryObject.userID = undefined; // בינתיים אין מה לעשות עם זה

  if (queryObject.size === "homepage") {
    const bannerArray: BannerInterface[] = [...await dalGetBannerImageByQuery({ ...queryObject, size: "all" }), ...await dalGetBannerImageByQuery({ ...queryObject, size: 'side' }), ...await dalGetBannerImageByQuery({ ...queryObject, size: 'top' })];
    if (bannerArray.length < 3) throw new ApiError({}, STATUS_CODES.NOT_FOUND, "One or more bannerImages not found");
    if (bannerArray.some(item => item instanceof Error)) throw new ApiError({ error: bannerArray.find(item => item instanceof Error) }, STATUS_CODES.BAD_GATEWAY, "One or more bannerImages not found");
    return bannerArray;
  } else {
    const bannerImage: BannerInterface[] = await dalGetBannerImageByQuery(queryObject);
    if (bannerImage.length === 0) throw new ApiError({}, STATUS_CODES.NOT_FOUND, "BannerImage not found");
    return bannerImage;
  };
};