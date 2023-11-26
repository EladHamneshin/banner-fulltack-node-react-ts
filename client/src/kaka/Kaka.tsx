// import React, { useState } from "react";

// interface Image {
//   src: string; 
// }

// function ImageCrop() {

//   const [image, setImage] = useState<Image>();
//   const [cropImage, setCropImage] = useState<Image>();
//   const [width, setWidth] = useState(200);
//   const [height, setHeight] = useState(150);

//   const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setImage({
//         src: URL.createObjectURL(e.target.files[0])  
//       });
//     }
//   };

//   const onCrop = () => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     canvas.width = width;
//     canvas.height = height;  
//     ctx?.drawImage(image!.src, 0, 0, width, height);
    
//     setCropImage({
//      src: canvas.toDataURL() 
//     });
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={onSelectFile} />
//       {image && <img src={image.src} />}

//       {cropImage && <img src={cropImage.src} />}

//       Width: <input 
//         value={width} 
//         onChange={(e) => setWidth(Number(e.target.value))} 
//       />
//       Height: <input 
//         value={height}
//         onChange={(e) => setHeight(Number(e.target.value))}  
//       />

//       <button onClick={onCrop}>Crop</button>
//     </div>
//   );
// }

// export default ImageCrop;