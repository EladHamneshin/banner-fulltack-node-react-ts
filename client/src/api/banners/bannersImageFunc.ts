import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URI


export const getAllBannersImage = async () => {

  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${API_URL}/api/bannersImage`,
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

