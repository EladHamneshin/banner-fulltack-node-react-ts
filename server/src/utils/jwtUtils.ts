import jwt from 'jsonwebtoken';

const generateToken = (userID: string) => {
    if(!process.env.JWT_SECRET) {
        console.error('JWT_SECRET not defined');
        process.exit(1);
    };

    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: '2d'
    });

    return token;

};

export default generateToken;