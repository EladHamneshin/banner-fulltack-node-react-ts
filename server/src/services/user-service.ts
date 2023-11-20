
import { ApiError } from "../utils/ApiError";
import {UserInterface as User } from "../types/interfaces/UserInterface";
import { Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import STATUS_CODES from "../utils/StatusCodes";
import Joi from 'joi';
// import { verifyTokenGoogle, payloadGoogle } from "../utils/auth-google";
// import { TokenPayload } from "google-auth-library";
import generateToken from "../utils/generateToken";







// פונקציה לקבלת רשימת משתמשים
const getUsers = async () => {
    try {
        throw new Error('no data base')
        
    }
    catch (error) {
        throw new ApiError({}, STATUS_CODES.NOT_FOUND , "users not found");
    }

}

// פונקציה לקבלת משתמש לפי ID
const getUserByID = async (id : string) => {    
    try {
        throw new Error('no data base')
        
    }
       catch (error){
        throw new ApiError({error}, STATUS_CODES.NOT_FOUND , "user not found");
       };
};

// פונקציה ליצירת משתמש חדש
const createUser = async (user : User) => {  
    const { name, email, password } = user;
    
    // בדיקת חוקיות אימייל וסיסמה
    const { error: emailError } = validateEmail(email);
    const { error: passwordError } = validatePassword(password);

    if (emailError || passwordError) {
        throw new ApiError({}, STATUS_CODES.BAD_REQUEST , "Invalid email or password");
    }

    // בדיקה אם המייל כבר קיים


    // הצפנת הסיסמה
    const hashedPassword = await hashPassword(password);

    // יצירת משתמש חדש
    

    try {
        throw new Error('no data base')
        
    }
      catch{  throw new ApiError( {}, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Invalid user data');
    }
}



// פונקציה לעדכון משתמש
const updateUser = async (id : string, updatedUser : User) => {
    const { name, email, password } = updatedUser;

    // בדיקת חוקיות אימייל וסיסמה
    const { error: emailError } = validateEmail(email);
    const { error: passwordError } = validatePassword(password);

    if (emailError || passwordError) {
        throw new ApiError({}, STATUS_CODES.BAD_REQUEST , "Invalid email or password");
    }
    const hashedPassword = await hashPassword(password);
    updatedUser.password = hashedPassword
    try {
        throw new Error('no data base')
        
    }
      catch (err){throw new ApiError({err}, STATUS_CODES.NOT_FOUND , "User not found");
    }
}

// פונקציה למחיקת משתמש
const deleteUser = async (id : string) => {
    try {
        throw new Error('no data base')
        
    }
      catch (err){ throw new ApiError({}, STATUS_CODES.NOT_FOUND , "User to you want delete not found");
    }

}

// פונקציה להתחברות משתמש
const loginUser = async (email : string, password : string) => {
    const user = await null 
    if (!user) {
        throw new ApiError({}, STATUS_CODES.NOT_FOUND , "User not found");
    }

    // בדיקה שהסיסמה מתאימה
    // const passwordMatch = await comparePassword(password, user.password);
    // if (!passwordMatch) {
    //     throw new ApiError({}, STATUS_CODES.UNAUTHORIZED , "Incorrect password");
    // }


    return user;
}




export default {
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
};



// הוספת פונקציה לצפנת סיסמה
const hashPassword = async (password : string) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

// הוספת פונקציה להשוואת סיסמה
const comparePassword = async (password : string, hashedPassword : string) => {
    return bcrypt.compare(password, hashedPassword);
}


// סכמות Joi
const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(6).max(15).required();

const validateEmail = (email : string) => emailSchema.validate(email);
const validatePassword = (password : string) => passwordSchema.validate(password);