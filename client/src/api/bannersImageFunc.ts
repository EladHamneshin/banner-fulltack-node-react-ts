import axios, { AxiosResponse } from 'axios';
import { BannerInterface } from '../types/BannerInterface';
// import dotenv from 'dotenv'
// dotenv.config()
const base_url = import.meta.env.VITE_BASE_URL
// const base_url = "http://127.0.0.1:5000"


export const getAllBannersImage = async () => {

  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${base_url}/api/bannersImage`,
    headers: {},
    data: data
  };
  try {
    const response : AxiosResponse<BannerInterface[], any> = await axios.request(config)
    // const res = await JSON.parse(response)
    console.log(response.data);
    
    return response.data

  } catch (err) {
    console.log(err);
  }
}
