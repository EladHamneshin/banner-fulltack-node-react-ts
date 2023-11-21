
import { ApiError } from "../utils/ApiError";

import STATUS_CODES from "../utils/StatusCodes";


import { BannerInterface } from "../types/interfaces/BannerInterface";

import dal from "../dal/bannersImage-dal"






// פונקציה לקבלת רשימת 
const getBannersImage = async () => {
    try {
        const banners : BannerInterface[] = await dal.getBannersImage()
        return banners
    }
    catch (error) {
        throw new ApiError({}, STATUS_CODES.NOT_FOUND, "users not found");
    }

}




export default {
    getBannersImage,
 
};

