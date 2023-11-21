
import { ApiError } from "../utils/ApiError";

import STATUS_CODES from "../utils/StatusCodes";


import { BannerInterface } from "../types/interfaces/BannerInterface";

import dal from "../dal/bannersImage-dal"






// פונקציה לקבלת רשימת 
const getBannersImage = async () => {
    
        const banners : BannerInterface[] = await dal.getBannersImage()
        if (! banners) {throw new ApiError({}, STATUS_CODES.NOT_FOUND, "users not found");}
        return banners 

}




export default {
    getBannersImage,
 
};

