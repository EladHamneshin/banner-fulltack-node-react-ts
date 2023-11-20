import mongoose from "mongoose";

const connectToDB = async () => {

    try{
        const conn = await mongoose.connect('mongodb://localhost:27017');
        console.log(`DB connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        };
    };
};

export default {connectToDB};