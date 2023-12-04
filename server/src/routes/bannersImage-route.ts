import express from "express";
import {
    getBannersImage,
    getBannersImageByProductID,
    getBannersImageByCategory,
    getBannersImageByUser,
    updateBannerImage,
    createBannerImage,
    deleteBannerImage,
    getBannerImagesByQuery,
    getTop5BannersImages,
} from "../controllers/bannerImage-controller";
import { authHandler } from "../middleware/auth-middleware";
// import { authHandler } from "../middleware/auth-middleware";


// Setup router
const routerBannersImage = express.Router();

// @desc   Get all bannersImage
// @route  GET /bannersImage
// @access Public
routerBannersImage.get("/", getBannersImage);

// @desc   Get bannersImage by productID
// @route  GET /bannersImage/product/:productID
// @access Public
routerBannersImage.get("/product/:productID", getBannersImageByProductID);

// @desc   Get bannersImage by category
// @route  GET /bannersImage/category/:categoryName
// @access Internal
routerBannersImage.get("/category/:categoryName", getBannersImageByCategory);

// @desc   Get bannersImage by user
// @route  GET /bannersImage/user
// @access Internal
routerBannersImage.get("/user/:userID", getBannersImageByUser);

// @desc   Update bannerImage by bannerID
// @route  PUT /bannersImage/:bannerID
// @access Internal
routerBannersImage.put("/:bannerID", updateBannerImage);

// @desc   Create bannerImage by productID
// @route  POST /bannersImage/:productID
// @access Internal
routerBannersImage.post("/:productID",authHandler, createBannerImage);

// @desc   Delete bannerImage by bannerID
// @route  DELETE /bannersImage/:bannerID
// @access Internal
routerBannersImage.delete("/:bannerID",authHandler ,deleteBannerImage);


// @desc Get top 5 clicked bannersImages
// @route GET /bannersImage/top5
// @access Internal

routerBannersImage.get("/top5", getTop5BannersImages);



routerBannersImage.get("/ext/", getBannerImagesByQuery);

// Export router; should always export as default
export default routerBannersImage;
