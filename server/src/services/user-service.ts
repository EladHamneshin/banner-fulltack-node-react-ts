import { ApiError } from "../utils/ApiError";

import { UserInterface as User } from "../types/interfaces/UserInterface";
import { Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import STATUS_CODES from "../utils/StatusCodes";
import userDal from "../dal/userDal";
import { comparePassword, hashPassword } from "../utils/encryptionUtils";
import {v4 as uuid} from 'uuid'



const authUser = async (email: string, password: string) => {
    const user = await userDal.getUserByEmail( email );
    if (!user) 
        throw new Error('User not found');

    const isPasswordCorrect = await comparePassword(password, user.password);


    if (!isPasswordCorrect)
     throw new ApiError({},STATUS_CODES.FORBIDDEN,'Invalid password');

    return user;
};

const registerUser = async (user : User) => {
    console.log(user);
    
    const {email, password} = user;

    const isUserRegisted = await userDal.getUserByEmail(email);
    if (isUserRegisted)
        throw new ApiError({}, STATUS_CODES.BAD_REQUEST, "user already registed");


    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword
    user._id = uuid();

    const newUser = await userDal.registerUser(user);
    if (!newUser)
        throw new ApiError({}, STATUS_CODES.INTERNAL_SERVER_ERROR, "something went wrong");
    
    return newUser;
};

export default {
    registerUser,
    authUser,
};

