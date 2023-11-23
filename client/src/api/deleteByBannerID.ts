import axios from 'axios';

export const deleteByBannerID = async (bannerID: string) => {

    let data = '';

    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `http://localhost:5000/api/bannersImage/${bannerID}`,
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

