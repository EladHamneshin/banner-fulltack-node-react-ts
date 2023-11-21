import { bannerModel } from "../models/bannersModel"; 
import { BannerInterface } from "../types/interfaces/BannerInterface";
import { ApiError } from "../utils/ApiError";
import STATUS_CODES from "../utils/StatusCodes";

const getBannersImage = async () => {
    try {
        const data : BannerInterface[] = await bannerModel.find({})
        return data
    }
    catch (error) {
        throw new ApiError({}, STATUS_CODES.NOT_FOUND, "banners not found");
    }

}

export default {
    getBannersImage
}