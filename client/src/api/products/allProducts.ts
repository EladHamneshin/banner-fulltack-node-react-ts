import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URI


export const getAllProducts = async () => {



    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${API_URL}/banners/api/ext/bannersProduct/top5/products`,

    };
    try {
        const res = await axios.request(config)
        return res.data
    } catch (error) {
        console.log(error)
        throw new Error(String(error))
    }
}