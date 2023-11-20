import  { Pool } from 'pg';

const postgresPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database:'users',
});


export default {postgresPool}