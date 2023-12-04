import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URI


export const deleteByBannerID = async (bannerID: string) => {

    let data = '';
    const token = localStorage.getItem('banner_token');

    
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${API_URL}/bannersImage/${bannerID}`,
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

