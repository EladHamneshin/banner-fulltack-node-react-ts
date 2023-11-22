import postgresPool from '../configs/pgConnect';
import { UserInterface as User } from '../types/interfaces/UserInterface';

const getUserByEmail = async (email: string) => {
    const client = await postgresPool.connect();
    const { rows } = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);
    
    client.release();
    return rows[0];
};

const getAllUsers = async () => {
    const client = await postgresPool.connect();
    const { rows } = await client.query(`SELECT * FROM users`);
    
    client.release();
    return rows;
};

const registerUser = async (user: User) => {
    const client = await postgresPool.connect();
    const { rows } = await client.query(`INSERT INTO users (id, name, email, password, isadmin) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user._id ,user.name, user.email, user.password, user.isAdmin]);
    client.release();
    return rows[0];
};


const deleteUser = async (userID: string) => {
    const client = await postgresPool.connect();
    
}
export default {getUserByEmail, registerUser,  getAllUsers, deleteUser} ;

