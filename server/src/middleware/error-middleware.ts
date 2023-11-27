import { ApiError } from "../types/interfaces/ApiErrorInterface";
import { Request, Response, NextFunction } from "express";


export const errorResponse = (error: ApiError, _req: Request, res: Response, _next: NextFunction) => {
   
   res.status(error.statusCode).json({
      success: false,
      data: error.data,
      message: error.message,
   });
};
