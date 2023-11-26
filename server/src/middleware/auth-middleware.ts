import jwt, { JwtPayload } from 'jsonwebtoken';
import { asyncHandler } from "../middleware/async-middleware";
import STATUS_CODES from '../utils/StatusCodes.js';
import { ApiError } from '../utils/ApiError';


const authHandler = asyncHandler(async (req, _res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    throw new ApiError({}, STATUS_CODES.UNAUTHORIZED, 'No authorized no token provided');

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET not defined');
    process.exit(1);
  };

  try {
    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET, { complete: true })
    console.log(decoded);

    const user = decoded.payload as JwtPayload;

    const userID = user.userID;
    const isAdmin = user.isAdmin;

  console.log(userID,isAdmin);
  

    next();
  } catch (error) {
    console.error(error);
    throw new ApiError({}, STATUS_CODES.UNAUTHORIZED, 'Not authorized, token failed');
  };
});

export { authHandler };