import { ApiError } from "../utils/ApiError";
import { UserInterface as User } from "../types/interfaces/UserInterface";
import STATUS_CODES from "../utils/StatusCodes";
import userDal from "../dal/userDal";
import { comparePassword, hashPassword } from "../utils/encryptionUtils";
import { v4 as uuid } from 'uuid';


const authUser = async (email: string, password: string) => {
    const user = await userDal.getUserByEmail(email);

    if (!user)
        throw new ApiError({}, STATUS_CODES.BAD_REQUEST, "User not found");
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect)
        throw new ApiError({}, STATUS_CODES.FORBIDDEN, 'Invalid password');

    return user;
};




const registerUser = async (user: User) => {
    const { email, password } = user;
    console.log(user);
    
    const isUserRegisted = await userDal.getUserByEmail(email);
    
    if (isUserRegisted)
        throw new ApiError({}, STATUS_CODES.BAD_REQUEST, "user already registed");


    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword
    user.id = uuid();

    const newUser = await userDal.registerUser(user);
    if (!newUser)
        throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, "something went wrong");

    return newUser;
};


const getAllUsers = async () => {
    const users = await userDal.getAllUsers();
    if (!users)
        throw new ApiError({}, STATUS_CODES.NOT_FOUND,'Error: No users found')

    return users;
};

const deleteUser = async (userID: string) => {
    const user = await userDal.deleteUser(userID);
    if (!user)
        throw new ApiError({}, STATUS_CODES.NOT_FOUND,'Error: User not found');
    return user;
};


export default {
    registerUser,
    authUser,
    getAllUsers,
    deleteUser
};


