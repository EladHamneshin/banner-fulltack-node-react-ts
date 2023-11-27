import postgresPool from '../configs/pgConnect';
import { UserInterface as User } from '../types/interfaces/UserInterface';
import { ApiError } from '../utils/ApiError';

const getUserByEmail = async (email: string) => {
    let client;
    try {
        client = await postgresPool.connect();
        const { rows } = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);
        return rows[0];
    } catch (error) {
        throw new ApiError({ error }, 500, 'Error connecting to database');
    } finally {
        client!.release();
    };
};

const getAllUsers = async () => {
    try {
        const client = await postgresPool.connect();
        const { rows } = await client.query(`SELECT * FROM users`);

        client.release();
        return rows;
    } catch (error) {
        throw new ApiError({ error }, 500, 'Error connecting to database');
    };
};

const registerUser = async (user: User) => {
    try {
        const client = await postgresPool.connect();
        const { rows } = await client.query(`INSERT INTO users (_id, name, email, password, isAdmin) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user.id, user.name, user.email, user.password, user.isadmin]);
        client.release();
        return rows[0];
    } catch (error) {
        throw new ApiError({ error }, 500, 'Error connecting to database');
    };
};


const deleteUser = async (userID: string) => {
    const client = await postgresPool.connect();

}
export default { getUserByEmail, registerUser, getAllUsers, deleteUser };

