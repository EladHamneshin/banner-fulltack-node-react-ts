import axios from 'axios';

const API_URI = import.meta.env.VITE_API_URI


export const uploadImageANDcreateBanner = async (newBanner: any) => {
    const imageFile = newBanner.image.url

    const resizedImage = await  resizeImage(imageFile, 80, 700);

    const FileName = newBanner.name + newBanner.size
    const cleanFileName = FileName.replace(/[^a-zA-Z0-9]/g, '')
    const blob = new Blob([resizedImage], { type: 'image/jpeg' });

    const file = new File([blob], `${cleanFileName}.jpg`);
    console.log(imageFile);

    const formData = new FormData();  //create new form object



    formData.append("myImage", file);


    let configUpImage = {
        method: "post",
        url: `${API_URI}/api/upload/image`,
        data: formData
    }


    try {
        const resURL = await axios.request(configUpImage)
        console.log(resURL.data);
        
        if (resURL.data.url) {
            newBanner.image.url = resURL.data.url
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
        }
    } catch (error) {
        console.log(error);
    }
}

function resizeImage(imageFile: File, targetWidth: number, targetHeight: number): Promise<File> {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // שים את התמונה בגודל מקורי
        const img = new Image();
        img.src = URL.createObjectURL(imageFile);

        img.onload = () => {
            // חשב את היחס בין הגודלים שאליו יתבצע החיתוך
            const aspectRatio = targetWidth / targetHeight;
            const imageAspectRatio = img.width / img.height;

            let drawWidth, drawHeight, x, y;

            // החיתוך יתבצע לפי יחס הגודלים
            if (aspectRatio > imageAspectRatio) {
                drawWidth = img.width;
                drawHeight = img.width / aspectRatio;
                x = 0;
                y = (img.height - drawHeight) / 2;
            } else {
                drawWidth = img.height * aspectRatio;
                drawHeight = img.height;
                x = (img.width - drawWidth) / 2;
                y = 0;
            }

            // שנה את הגודל של ה-Canvas
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            // ביצע את החיתוך
            ctx?.drawImage(img, x, y, drawWidth, drawHeight, 0, 0, targetWidth, targetHeight);

            // מירת Canvas ל-Blob
            canvas.toBlob(blob => {
                // יצירת קובץ חדש מה-Blob
                const resizedFile = new File([blob!], 'cropped_image.jpg');
                resolve(resizedFile);
            }, 'image/jpeg');
        };
    });
}
