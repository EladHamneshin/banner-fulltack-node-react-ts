import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URI

export const uploadImageANDcreateBanner = async (newBanner: any) => {
    const imageFile = newBanner.image.url
    const formData = new FormData();  //create new form object
    formData.append("myImage", imageFile);

    let configUpImage = {
        method: "post",
        url: `${API_URL}/api/upload/image`,

        data: formData,
    }


    try {
        const resURL = await axios.request(configUpImage)
        if (resURL.data.data.url) {
            newBanner.image.url = resURL.data.url
            console.log(newBanner);

            let data = JSON.stringify(newBanner);

            let configCraete = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${API_URL}/api/bannersImage/${newBanner.productID}`,
                headers: {},
                data: data
            };
            const res = await axios.request(configCraete)
            return res.data
        }
    } catch (error) {
        console.log(error);
    }
}


