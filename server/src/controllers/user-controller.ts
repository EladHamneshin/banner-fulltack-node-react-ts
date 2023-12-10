import { Request, Response, NextFunction } from "express";
import { ApiSuccess } from "../utils/ApiSucess.js";
import { asyncHandler } from "../middleware/async-middleware.js";
import { UserInterface as User } from "../types/interfaces/UserInterface.js";
import { ApiError } from "../utils/ApiError.js";
import userService from "../services/user-service.js";
import STATUS_CODES from "../utils/StatusCodes.js";
import { registerUserValidation, loginUserValidation } from "../utils/validations/userValidation.js";
import generateToken from "../utils/jwtUtils.js";
import jwt from 'jsonwebtoken';

// @desc Auth user & login
// @route POST /api/users/login
// @acces public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { error } = loginUserValidation(req.body);
  if (error)
    throw new ApiError({}, STATUS_CODES.BAD_REQUEST, error.message);

  if (req.headers.authorization) {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET!, (err: any, decoded: any) => {
      if (!err) throw new ApiError({}, STATUS_CODES.BAD_REQUEST, 'User already logged in');
    }
    )
  }

  const { email, password } = req.body;

  const user = await userService.authUser(email, password);
  generateToken(res, user.id, user.isadmin);

  res.status(STATUS_CODES.OK).json(new ApiSuccess(user, "Success!"));
});


// @desc  Register new user
// @route POST /api/users/register
// @acces public
export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const { error } = registerUserValidation(req.body);
  if (error)
    throw new ApiError({}, 400, error.message);

  const user = await userService.registerUser(req.body);

  res.status(STATUS_CODES.CREATED).json(new ApiSuccess<User>(user, "Success!"));
},
);

// @desc    Logout user / clear cookie
// @route   POST /api/users/auth/logout
// @access  Public
const logoutUser = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(STATUS_CODES.OK).json({ message: 'Logged out successfully' });
};

// @desc    Get all users
// @route   GET /api/users/
// @access  Public
export const getAllUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.isadmin) throw new ApiError({}, STATUS_CODES.FORBIDDEN, 'You are not admin');
  const users = await userService.getAllUsers();

  res.status(STATUS_CODES.OK).json(new ApiSuccess<User[]>(users, "Success!"));
},
);





// @desc Delete a user
// @route DELETE /api/users/
// @access private/admin
export const deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.deleteUser(req.userID);

  res.status(STATUS_CODES.OK).json(new ApiSuccess(user, "Success!"));
});

// @desc Update a user
// @route PUT /api/users/
// @access private/admin
export const updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.updateUser(req.userID, req.body);
  res.status(STATUS_CODES.OK).json(new ApiSuccess(user, "Success!"));
});


export default { registerUser, loginUser, logoutUser, deleteUser, getAllUsers, updateUser };








