import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URI







export const bannerByCategoryByName = async (name: string) => {

    let data = '';

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: ` ${API_URL}/banners/api/bannersImage/category/${name}`,
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

