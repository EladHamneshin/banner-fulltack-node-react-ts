import axios from 'axios';

const API_URI = import.meta.env.VITE_API_URI


export const createBanner = async (newBanner: any, productID : string) => {
    

    try {
        console.log(newBanner);
        

            // let data = await JSON.stringify(newBanner);

            let configCraete = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${API_URI}/api/bannersImage/${productID}`,
                data: newBanner
            };
            const res = await axios.request(configCraete)
            return res.data
        
    } catch (error) {
        console.log(error);
    }
}
