import { bannerModel } from "../models/bannersModel";
import { BannerInterface } from "../types/interfaces/bannerInterface";
import { queryInterface } from "../types/interfaces/imageQueryInterface";
import { ApiError } from "../utils/ApiError";
import STATUS_CODES from "../utils/StatusCodes";

// Function to get all bannersImage
export const getBannersImage = async (): Promise<BannerInterface[]> => {
  try {
    const data: BannerInterface[] = await bannerModel.find({});
    return data;
  } catch (error) {

    throw new ApiError({ error }, STATUS_CODES.INTERNAL_SERVER_ERROR, "Banners not found faild in .dal");

  }
};

// Function to get bannersImage by productID
export const getBannersImageByProductID = async (productID: string) => {

  const data: BannerInterface[] | null = await bannerModel.find({ productID });

  if (!data) { throw new ApiError({}, STATUS_CODES.NO_CONTENT, "Banner by ID not found faild in .dal"); }
  return data;

};

// Function to get bannersImage by category
export const getBannersImageByCategory = async (categoryName: string): Promise<BannerInterface[]> => {
  try {
    const data: BannerInterface[] = await bannerModel.find({ categoryName });
    return data;
  } catch (error) {
    throw new ApiError({ error }, STATUS_CODES.NOT_FOUND, "Banners by category not found faild in .dal");
  }
};

// Function to get bannersImage by user
export const getBannersImageByUser = async (userID: string): Promise<BannerInterface[]> => {
  try {
    const data: BannerInterface[] = await bannerModel.find({ userID });
    return data;
  } catch (error) {
    throw new ApiError({ error }, STATUS_CODES.NOT_FOUND, "Banners by user not found faild in .dal");
  }
};

// Function to update bannerImage by bannerID
export const updateBannerImage = async (bannerID: string, data: Partial<BannerInterface>): Promise<BannerInterface | null> => {
  try {
    const updatedBanner: BannerInterface | null = await bannerModel.findByIdAndUpdate(bannerID, data, { new: true });
    return updatedBanner;
  } catch (error) {
    throw new ApiError({ error }, STATUS_CODES.NOT_FOUND, "Banners not found faild in .dal");
  }
};

// Function to create bannerImage by productID
export const createBannerImage = async (productID: string, data: Partial<BannerInterface>): Promise<BannerInterface> => {
  try {
    const newBanner: BannerInterface = await bannerModel.create({ productID, ...data });
    return newBanner;
  } catch (error) {
    throw new ApiError({ error }, STATUS_CODES.NOT_FOUND, "Banners not found faild in .dal");
  }
};

// Function to delete bannerImage by bannerID
export const deleteBannerImage = async (bannerID: string): Promise<BannerInterface | null> => {
  try {
    const deletedBanner: BannerInterface | null = await bannerModel.findByIdAndDelete(bannerID);
    return deletedBanner;
  } catch (error) {
    throw new ApiError({ error }, STATUS_CODES.NOT_FOUND, "Banners not found faild in .dal");
  }
};


export const getBannerImageByQuery = async (queryObject: queryInterface): Promise<BannerInterface[]> => {
  const query: any = {}
  if (queryObject.category) {
    query.categoryName = queryObject.category
  }
  if (queryObject.size) {
    query.size = queryObject.size
  }
  const data = await bannerModel.find(query).limit(Number(queryObject.limit))
  return data;
};


