import jwt, { JwtPayload } from 'jsonwebtoken';
import { asyncHandler } from "../middleware/async-middleware";
import STATUS_CODES from '../utils/StatusCodes';
import { ApiError } from '../utils/ApiError';
import { NextFunction, Request, Response } from 'express';


const authHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token)
    throw new ApiError({}, STATUS_CODES.UNAUTHORIZED, 'No authorized no token provided');

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET not defined');
    process.exit(1);
  };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { complete: true })

    const user = decoded.payload as JwtPayload;

    const id = user.id;
    const isadmin = user.isadmin;

    req.userID = id;
    req.isadmin = isadmin;

    next();
  } catch (error) {
    console.error(error);
    throw new ApiError({}, STATUS_CODES.UNAUTHORIZED, 'Not authorized, token failed');
  };
});

export { authHandler };