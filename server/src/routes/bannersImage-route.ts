import express from "express";

// Import controllers from
import {
    getBannersImage,
    getBannersImageByProductID,
    getBannersImageByCategory,
    getBannersImageByUser,
    updateBannerImage,
    createBannerImage,
    deleteBannerImage,
} from "../controllers/bannerImage-controller";


// Setup router
const routerBannersImage = express.Router();

// @desc   Get all bannersImage
// @route  GET /bannersImage
// @access Public
routerBannersImage.get("/", getBannersImage);

// @desc   Get bannersImage by productID
// @route  GET /bannersImage/:productID
// @access Public
routerBannersImage.get("/:productID", getBannersImageByProductID);

// @desc   Get bannersImage by category
// @route  GET /bannersImage/category/:categoryName
// @access Internal
routerBannersImage.get("/category/:categoryName", getBannersImageByCategory);

// @desc   Get bannersImage by user
// @route  GET /bannersImage/user
// @access Internal
routerBannersImage.get("/user", getBannersImageByUser);

// @desc   Update bannerImage by bannerID
// @route  PUT /bannersImage/:bannerID
// @access Internal
routerBannersImage.put("/:bannerID", updateBannerImage);

// @desc   Create bannerImage by productID
// @route  POST /bannersImage/:productID
// @access Internal
routerBannersImage.post("/:productID", createBannerImage);

// @desc   Delete bannerImage by bannerID
// @route  DELETE /bannersImage/:bannerID
// @access Internal
routerBannersImage.delete("/:bannerID", deleteBannerImage);

// Export router; should always export as default
export default routerBannersImage;
