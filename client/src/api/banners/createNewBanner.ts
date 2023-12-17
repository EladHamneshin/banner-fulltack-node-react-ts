import axios from 'axios';
const API_URI = import.meta.env.VITE_API_URI

export const createBanner = async (newBanner: any, productID: string) => {

    try {
        let token = localStorage.getItem('banner_token');
        if (!token) { token = ''}
console.log(token);

        let configCraete = {  
            method: 'post',
            maxBodyLength: Infinity,   
            url: `${API_URI}/bannersImage/${productID}`,
            headers: { 
                'Authorization': token, 
                'Content-Type': 'application/json'
              },
            data: newBanner
        };
        const res = await axios.request(configCraete)
        return res.data

    } catch (error) {
        console.log(error);
    }
}
