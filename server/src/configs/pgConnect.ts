import { config } from 'dotenv';
import  { Pool } from 'pg';


const connectionString = process.env.PG_URI

const postgresPool = new Pool({connectionString,});
export const connectToPostgres = async () => {

    const connect = await postgresPool.connect()
    console.log("Connecting to postgres");
    connect.release()
}






export default postgresPool