import postgresPool from '../configs/pgConnect';
import { UserInterface as User } from '../types/interfaces/UserInterface';
import { ApiError } from '../utils/ApiError';
import STATUS_CODES from '../utils/StatusCodes';

const getUserByEmail = async (email: string) => {
    let client;
    try {
        client = await postgresPool.connect();
        console.log(client);
        
        try {
            const { rows } = await client.query("SELECT * FROM users WHERE email = $1", [email]);            
            return rows[0];
        } catch (queryError) {
            console.log(queryError);
            
            throw new ApiError( queryError , STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong, stack: 1');
        } finally {
            client.release();
        }
    } catch (connectionError) {
        console.log(connectionError);
        
        if (connectionError instanceof ApiError) throw connectionError;
        throw new ApiError(connectionError , STATUS_CODES.BAD_GATEWAY, 'Could not connect to the database, stack: 1');
    }
};

const registerUser = async (user: User) => {
    let client;
    try {
        client = await postgresPool.connect();
        try {
            const { rows } = await client.query(`INSERT INTO users (id, name, email, password, isadmin) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user.id, user.name, user.email, user.password, user.isadmin]);
            return rows[0];
        } catch (queryError) {
            throw new ApiError( queryError , STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong, stack: 1');
        } finally {
            client.release();
        }
    } catch (connectionError) {
        if (connectionError instanceof ApiError) throw connectionError;
        throw new ApiError( connectionError , STATUS_CODES.BAD_GATEWAY, 'Could not connect to the database, stack: 1');
    }
};

const getAllUsers = async () => {
    let client;
    try {
        client = await postgresPool.connect();
        try {
            const { rows } = await client.query("SELECT * FROM users");
            return rows;
        } catch (queryError) {
            throw new ApiError(queryError, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong, stack: 1');
        } finally {
            client.release();
        }
    } catch (connectionError) {
        if (connectionError instanceof ApiError) throw connectionError;
        throw new ApiError( connectionError , STATUS_CODES.BAD_GATEWAY, 'Could not connect to the database, stack: 1');
    }
};

const deleteUser = async (userID: string) => {
    let client;
    try {
        client = await postgresPool.connect();
        try {
            const { rows } = await client.query("DELETE FROM users WHERE id = $1 RETURNING *", [userID]);
            return rows[0];
        } catch (queryError) {
            throw new ApiError( queryError , STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong, stack: 1');
        } finally {
            client.release();
        };
    } catch (connectionError) {
        if (connectionError instanceof ApiError) throw connectionError;
        throw new ApiError( connectionError , STATUS_CODES.BAD_GATEWAY, 'Could not connect to the database, stack: 1');
    };
};


export default { getUserByEmail, registerUser, getAllUsers, deleteUser };

