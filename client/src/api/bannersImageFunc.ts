import  axios  from 'axios';


export const getAllBannersImage = () => {
    
let data = '';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:5000/bannersImage',
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
