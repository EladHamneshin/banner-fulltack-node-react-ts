import axios from 'axios';

const API_URI = import.meta.env.VITE_API_URI


export const createBanner = async (newBanner: any) => {
    

    try {
        console.log(newBanner);
        

            let data = JSON.stringify(newBanner);

            let configCraete = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${API_URI}/api/bannersImage/${newBanner.productID}`,
                headers: {},
                data: data
            };
            const res = await axios.request(configCraete)
            return res.data
        
    } catch (error) {
        console.log(error);
    }
}
