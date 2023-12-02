import mongoose from "mongoose";

const connectToDB = async () => {
    const dbUri = process.env.MONGO_URI!

    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is not defined');
        process.exit(1);
    };
    try {
        console.log('Connecting to mongodb');
        const conn = await mongoose.connect(dbUri);
        console.log(`DB connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        };
    };
};

export default connectToDB;
