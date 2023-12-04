import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URI


export const getAllProducts = async () => {

    const token = localStorage.getItem('banner_token');
    
    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${API_URL}/ext/bannersProduct/top5/products`,
        headers: { 
            'Authorization': token, 
            'Content-Type': 'application/json'
          },

    };
    try {
        const res = await axios.request(config)
        return res.data
    } catch (error) {
        console.log(error)
        throw new Error(String(error))
    }
}