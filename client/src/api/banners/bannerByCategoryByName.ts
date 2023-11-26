import axios from 'axios';

export const bannerByCategoryByName = async (name: string) => {

    let data = '';

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: ` http://localhost:5000/api/bannersImage/category/${name}`,
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

