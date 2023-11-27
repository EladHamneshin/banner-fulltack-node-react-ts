import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";


const connectToDB = async () => {
    let dbUri = process.env.MONGO_URI!


    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is not defined');


        process.exit(1);
    }
    if (process.env.NODE_ENV === "test") {
        // console.log("Connecting to MongoDB Memory Server");
        let mongoMemoryServer: MongoMemoryServer;
        mongoMemoryServer = await MongoMemoryServer.create();
        dbUri = mongoMemoryServer.getUri();
        const port = parseInt(dbUri.split(':')[2].split('/')[0]);
        console.log('MongoDB server running on port:', port);
    }
    try {
        const conn = await mongoose.connect(dbUri);
        // console.log(`DB connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        };
    };
};

export default connectToDB;