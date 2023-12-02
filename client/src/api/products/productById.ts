import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URI


export const getProductById = async (productID: string) => {



    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://erp-server-zqf9.onrender.com/inventory/${productID}`,

    };
    try {
        const res = await axios.request(config)
        return res.data
    } catch (error) {
        console.log(error);
    }
}