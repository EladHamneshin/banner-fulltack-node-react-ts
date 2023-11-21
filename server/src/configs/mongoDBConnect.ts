import mongoose from "mongoose";

const connectToDB = async () => {
    if(!process.env.MONGODB_URI){
        console.error('MONGODB_URI is not defined');
        process.exit(1);
    }

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`DB connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        };
    };
};

export default {connectToDB};