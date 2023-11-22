import { LoginInterface, UserInterface } from "../types/UserInterface";
import axios from 'axios';


export const regiterFetch = async (user: UserInterface) => {

    let data = user

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/api/users/register',
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



