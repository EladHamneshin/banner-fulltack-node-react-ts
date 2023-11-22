import express from "express";
import userController from "../controllers/user-controller";
import { authHandler } from "../middleware/auth-middleware";


const router = express.Router();


router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.delete('/', authHandler,userController.deleteUser);


export default router;