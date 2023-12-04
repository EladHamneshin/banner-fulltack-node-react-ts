import { UserInterface } from "../../types/UserInterface";
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URI

export const editUserFetch = async (user: UserInterface) => {

    let data = user

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${API_URL}/users/`,
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



