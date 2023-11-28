// import React, { useState } from 'react';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
// import { uploadImageToServer } from '../api/banners/uploadImage';

// function ImageUploadPreview() {
//   const [originalImage, setOriginalImage] = useState(null);
//   const [croppedImage, setCroppedImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0, width: 200, height: 200 });

//   async function getCroppedImg(image, crop) {
//     const canvas = document.createElement('canvas');
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;

//     canvas.width = crop.width;
//     canvas.height = crop.height;
//     const ctx = canvas.getContext('2d');

//     ctx.drawImage(
//       image,
//       crop.x * scaleX,
//       crop.y * scaleY,
//       crop.width * scaleX,
//       crop.height * scaleY,
//       0,
//       0,
//       crop.width,
//       crop.height
//     );

//     return new Promise((resolve) => {
//       canvas.toBlob((blob) => {
//         blob.name = 'croppedImage.jpeg';
//         resolve(blob);
//       }, 'image/jpeg');
//     });
//   }

//   async function onSelectFile(e) {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader();
//       reader.addEventListener('load', () =>
//         setOriginalImage(reader.result)
//       );
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   }

//   async function onSubmit(e) {
//     e.preventDefault();

//     let croppedImageBlob = await getCroppedImg(originalImage, crop);

//     // קוד לשליחת הקובץ לשרת
    

//     const res = uploadImageToServer( croppedImageBlob )
//     setCroppedImage(res);
// }

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={onSelectFile} />

//       {originalImage && (
//         <ReactCrop
//           src={originalImage}
//           crop={crop}
//           onChange={(newCrop) => setCrop(newCrop)}
//         />
//       )}

//       <button onClick={onSubmit}>העלה וקצץ</button>

//       {croppedImage && <img src={croppedImage} alt="Cropped" />}
//     </div>
//   );
// }

// export default ImageUploadPreview;
