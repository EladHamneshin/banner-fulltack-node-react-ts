import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URI







export const getBannerImageByParams = async (params: string) => {
    console.log(params);
    

    let data = '';

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: ` ${API_URL}/api/bannersImage/ext/?${params}`,
        headers: {},
        data: data
    };
    try {
        console.log(config.url);
        
        const res = await axios.request(config)
        return res.data
    } catch (error) {
        console.log(error);
    }
}

