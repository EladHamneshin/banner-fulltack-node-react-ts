export default function resizeImage(imageFile: File, targetWidth: number, targetHeight: number): Promise<File> {
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
