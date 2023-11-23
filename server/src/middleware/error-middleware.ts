// import STATUS_CODES from "../utils/StatusCodes";
import { ApiError } from "../types/interfaces/ApiErrorInterface";
import { Request, Response, NextFunction } from "express";


// @desc Handles error responses from throw errors

export const errorResponse = (error: ApiError, _req: Request, res: Response, _next: NextFunction) => {
   res.status(404).json({
      success: false,
      data: error.data,
      message: error.message,
   });
};

