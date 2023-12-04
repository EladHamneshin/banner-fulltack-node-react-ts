import jwt from 'jsonwebtoken';
import { Response } from "express";

const generateToken = (res: Response, userID: string, isadmin: boolean) => {
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET not defined');
        process.exit(1);
    };

    const token = jwt.sign({ 
        id: userID,
        isadmin: isadmin  
      }, process.env.JWT_SECRET, {
        expiresIn: '2d'
      })

    res.setHeader('authorization',token)
};



export default generateToken;