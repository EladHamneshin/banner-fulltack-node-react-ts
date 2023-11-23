import axios from 'axios';

const base_url = import.meta.env.VITE_BASE_URL

export const loginFetch = async (user: string) => {

    let data = user

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${base_url}/api/users/login`,
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
