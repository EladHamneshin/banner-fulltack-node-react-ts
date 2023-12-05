
import  { Pool } from 'pg';




const postgresPool = new Pool({});
export const connectToPostgres = async () => {

    const connect = await postgresPool.connect()
    console.log("Connecting to postgres");
    connect.release()
}






export default postgresPool