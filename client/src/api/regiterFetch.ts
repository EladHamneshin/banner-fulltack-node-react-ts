import { UserInterface } from "../types/UserInterface";
import axios from 'axios';

const base_url = import.meta.env.VITE_BASE_URL

export const regiterFetch = async (user: UserInterface) => {

    let data = user

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${base_url}/api/users/register`,
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



