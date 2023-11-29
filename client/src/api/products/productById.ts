import axios from 'axios';

// const API_URL = import.meta.env.ERP_BASE_URL


export const getProductById = async (productID: string) => {



    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://inventory-service-erp.onrender.com/api/shopInventory/${productID}`,

    };
    try {
        const res = await axios.request(config)
        return res.data
    } catch (error) {
        console.log(error);
    }
}