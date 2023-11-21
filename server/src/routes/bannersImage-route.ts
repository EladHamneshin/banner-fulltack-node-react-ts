import express from "express";

// Import controllers from
import { 
    errorUser, 
    getBannersImage, 

   
} from "../controllers/bannerImage-controller";


// Setup router
const routerBannersImage = express.Router();

// Setup all routes for BannersImage
routerBannersImage.get("/", getBannersImage);


//  @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public


// Setup all routes for user
routerBannersImage.get("/error", errorUser);

// Export router; should always export as default
export default routerBannersImage;
