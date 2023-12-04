import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URI


export const bannerByUserID = async (userID: string) => {

    let data = '';
    let token = localStorage.getItem('banner_token');
    if (!token) { token = ''}
    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${API_URL}/bannersImage/user/${userID}`,
        headers: { 
            'Authorization': token, 
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

