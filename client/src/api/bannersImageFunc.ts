
import axios, { AxiosResponse } from 'axios';
import { BannerInterface } from '../types/BannerInterface';
// import dotenv from 'dotenv'
// dotenv.config()
const base_url = import.meta.env.VITE_BASE_URL
// const base_url = "http://127.0.0.1:5000"



export const getAllBannersImage = () => {
    
let data = '';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `${base_url}/bannersImage`,
  headers: { },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
}
