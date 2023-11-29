import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URI

export const loginFetch = async (user: string) => {

    let data = user

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_URL}/banners/api/users/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const res = await axios.request(config)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
