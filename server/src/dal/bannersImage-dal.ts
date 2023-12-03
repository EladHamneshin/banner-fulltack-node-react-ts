import { bannerModel } from "../models/bannersModel";
import { BannerInterface } from "../types/interfaces/bannerInterface";
import { queryInterface } from "../types/interfaces/imageQueryInterface";
import { ApiError } from "../utils/ApiError";
import STATUS_CODES from "../utils/StatusCodes";

// Function to get all bannersImage
export const getAllBannersImages = async (): Promise<BannerInterface[]> => {
  try {
    const data: BannerInterface[] = await bannerModel.find({});
    return data;
  } catch (error) {
    throw new ApiError( error , STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to get bannersImage by productID, stack:1");
  }
};

// Function to get bannersImage by productID
export const getBannersImageByProductID = async (productID: string): Promise<BannerInterface[]> => {
  try {
    const data: BannerInterface[] = await bannerModel.find({ productID });
    return data;
  } catch (error) {
    throw new ApiError( error , STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to get bannersImage by productID, stack:1");
  }
};

// Function to get bannersImage by category
export const getBannersImagesByCategory = async (categoryName: string): Promise<BannerInterface[]> => {
  try {
    const data: BannerInterface[] = await bannerModel.find({ categoryName });
    return data;
  } catch (error) {
    throw new ApiError( error , STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to get bannerImages by category, stack:1");
  }
};

// Function to get bannersImage by user
export const getBannersImagesByUser = async (userID: string): Promise<BannerInterface[]> => {
  try {
    const data: BannerInterface[] = await bannerModel.find({ author: userID });
    return data;
  } catch (error) {
    throw new ApiError( error , STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to get bannersImages by user, stack:1");
  }
};

// Function to update bannerImage by bannerID
export const updateBannerImage = async (bannerID: string, data: Partial<BannerInterface>): Promise<BannerInterface | null> => {
  try {
    const updatedBanner: BannerInterface | null = await bannerModel.findByIdAndUpdate(bannerID, data, { new: true });
    return updatedBanner;
  } catch (error) {
    throw new ApiError( error , STATUS_CODES.INTERNAL_SERVER_ERROR, "Error while updating bannerImage, stack:1");
  }
};

// Function to create bannerImage by productID
export const createBannerImage = async (productID: string, data: Partial<BannerInterface>, userID: string): Promise<BannerInterface> => {
  try {
    const createdBanner: BannerInterface = await bannerModel.create({ ...data, author: userID, productID: productID },);
    return createdBanner;
  } catch (error) {
    throw new ApiError( error , STATUS_CODES.INTERNAL_SERVER_ERROR, "Error while creating new bannerImage, stack:1");
  };
};

// Function to delete bannerImage by bannerID
export const deleteBannerImage = async (bannerID: string): Promise<BannerInterface | null> => {
  try {
    const deletedBanner: BannerInterface | null = await bannerModel.findByIdAndDelete(bannerID);
    return deletedBanner;
  } catch (error) {
    throw new ApiError( error , STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to delete bannerImage, stack:1");
  }
};


export const getBannerImageByQuery = async (queryObject: queryInterface): Promise<BannerInterface[]> => {
  try {
    const query: any = {}
    if (queryObject.category) {
      query.categoryName = queryObject.category
    }
    if (queryObject.size) {
      query.size = queryObject.size
    }
    const data = await bannerModel.find(query).limit(Number(queryObject.limit))
    return data;
  } catch (error) {
    throw new ApiError( error , STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to get bannersImages by query, stack:1");
  }
};


