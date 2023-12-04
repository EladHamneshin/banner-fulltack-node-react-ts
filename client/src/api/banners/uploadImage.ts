import axios from 'axios';

const API_URI = import.meta.env.VITE_API_URI


export  const uploadImageToServer = async (image: File) => {

    const formData = new FormData();  //create new form object
    formData.append("myImage", image);
    const token = localStorage.getItem('banner_token');
    
    
    let configUpImage = {
        method: "post",
        url: `${API_URI}/upload/image`,
        headers: { 
            'Authorization': token, 
            'Content-Type': 'application/json'
          },
        data: formData
    }

    try {
        const resURL = await axios.request(configUpImage)
        console.log(resURL.data);
        return resURL.data.url
    } catch (error) {
        console.log(error);
    }
}