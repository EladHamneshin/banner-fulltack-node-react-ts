import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URI
const API_URL = import.meta.env.VITE_API_URI

export const getProductById = async (productID: string) => {

    let token = localStorage.getItem('banner_token');
    if (!token) { token = ''}

    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${API_URL}/ext/bannersProduct/${productID}`,
        headers: { 
            'Authorization': token, 
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