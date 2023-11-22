import express from "express";

// Import controllers from
import userController from "../controllers/user-controller";



// Setup router
const router = express.Router();

// add a token 
router.get("/", userController.getAllUsers);

router.post("/register", userController.registerUser);


router.post("/login", userController.loginUser);


export default router;
