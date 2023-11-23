import jwt, { JwtPayload } from 'jsonwebtoken';
import { asyncHandler } from "../middleware/async-middleware";
import STATUS_CODES from '../utils/StatusCodes';
import { ApiError } from '../utils/ApiError';


const authHandler = asyncHandler(async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token)
    throw new ApiError({}, STATUS_CODES.UNAUTHORIZED, 'No authorized no token provided');

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET not defined');
    process.exit(1);
  };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    const userID = (decoded as JwtPayload).userID;
    const isAdmin = (decoded as JwtPayload).isAdmin;
    req.body.userID = userID;
    req.body.isAdmin = isAdmin;
    console.log(isAdmin);
    console.log(userID);
    
    
    next();
  } catch (error) {
    console.error(error);
    throw new ApiError({}, STATUS_CODES.UNAUTHORIZED, 'Not authorized, token failed');
  };
});

export { authHandler };