import { Request, Response, NextFunction } from "express";
import { ApiSuccess } from "../utils/ApiSucess";
import { asyncHandler } from "../middleware/async-middleware";
import { UserInterface as User } from "../types/interfaces/UserInterface";
import { ApiError } from "../utils/ApiError";
import userService from "../services/user-service";
import STATUS_CODES from "../utils/StatusCodes";
import { registerUserValidation, loginUserValidation } from "../utils/validations/userValidation";
import generateToken from "../utils/jwtUtils";


// @desc Auth user & login
// @route POST /api/users/login
// @acces public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { error } = loginUserValidation(req.body);
  if (error)
    throw new ApiError({}, STATUS_CODES.BAD_REQUEST, error.message);

  if (req.headers.authorization)
    throw new ApiError({}, STATUS_CODES.BAD_REQUEST, 'User already logged in');

  const { email, password } = req.body;

  const user = await userService.authUser(email, password);
  console.log(user);
  
  generateToken(res, user.id, user.isadmin);

  res.status(STATUS_CODES.OK).json(new ApiSuccess({ user }, "Success!"));
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

export const getAllUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const users = await userService.getAllUsers();

  res.status(STATUS_CODES.OK).json(new ApiSuccess<User[]>(users, "Success!"));
},
);





// @desc Delete a user
// @route DELETE /api/users/
// @access private/admin
export const deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // const deletedUser = await userService.deleteUser(req.body.userID);

  res.status(STATUS_CODES.OK).json(new ApiSuccess('', "Success!"));
})
export default { registerUser, loginUser, deleteUser, getAllUsers }








