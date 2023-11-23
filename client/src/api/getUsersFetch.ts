import axios from 'axios';


export const getAllUsers = async () => {

    let data = '';

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: "http://localhost:5000/users/",
        headers: {},
        data: data
    };
    try {
        const res = await axios.request(config)
        return res.data
    } catch (error) {
        console.log(error);
    }
}

