import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URI

export const deleteUserFetch = async () => {

    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${API_URL}/users/`,
        headers: {
            'Content-Type': 'application/json'
        },
    };

    try {
        const res = await axios.request(config)
        return res.data
    } catch (error) {
        console.log(error);
    }
}



