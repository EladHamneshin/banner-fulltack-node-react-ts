import jwt from 'jsonwebtoken';

const generateToken = (userID: string,isAdmin:boolean) => {
    if(!process.env.JWT_SECRET) {
        console.error('JWT_SECRET not defined');
        process.exit(1);
    };

    const token = jwt.sign({userID,isAdmin}, process.env.JWT_SECRET, {
        expiresIn: '2d'
    });

    return token;

};

export default generateToken;