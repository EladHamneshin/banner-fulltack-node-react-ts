import postgresPool from '../configs/pgConnect';
import { UserInterface as User } from '../types/interfaces/UserInterface';

const getUserByEmail = async (email: string) => {
    const client = await postgresPool.connect();
    const { rows } = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);
    
    client.release();
    return rows[0];
};

const getAllUsers = async () => {
    console.log('a');
    
    const client = await postgresPool.connect();
    console.log('b');
    const { rows } = await client.query(`SELECT * FROM users`);
    
    client.release();
    return rows;
};

const registerUser = async (user: User) => {
    const client = await postgresPool.connect();
    const { rows } = await client.query(`INSERT INTO users (_id, name, email, password, isAdmin) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user.id ,user.name, user.email, user.password, user.isadmin]);
    client.release();
    return rows[0];
};


const deleteUser = async (userID: string) => {
    const client = await postgresPool.connect();
    
}
export default {getUserByEmail, registerUser,  getAllUsers, deleteUser} ;

