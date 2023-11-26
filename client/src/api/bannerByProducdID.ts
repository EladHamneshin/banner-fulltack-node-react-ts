import axios from 'axios';


export const bannerByProducdID = async (productID: string) => {
  console.log(productID);


  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: ` http://localhost:5000/api/bannersImage/procuct/${productID}`,
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

