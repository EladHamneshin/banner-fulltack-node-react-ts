// import { Box } from '@mui/system';
// import React, { useMemo, useState } from 'react'
// import { useDropzone } from 'react-dropzone';
// import { v4 as uuidv4 } from 'uuid';

// type Props = {}
// const baseStyle = {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '20px',
//     borderWidth: 2,
//     borderRadius: 2,
//     borderColor: '#eeeeee',
//     borderStyle: 'dashed',
//     backgroundColor: '#fafafa',
//     color: '#bdbdbd',
//     outline: 'none',
//     transition: 'border .24s ease-in-out'
// };

// const focusedStyle = {
//     borderColor: '#2196f3'
// };

// const acceptStyle = {
//     borderColor: '#00e676'
// };

// const rejectStyle = {
//     borderColor: '#ff1744'
// };

// const UpImageBanner = () => {
//     const [imageData, setImageData] = useState<string | ArrayBuffer | null>(null);
//     const [width, setWidth] = useState(300); // רוחב רצוי כברירת מחדל
//     const [height, setHeight] = useState(200); // גובה רצוי כברירת מחדל

//     const onDrop = (acceptedFiles: File[]) => {
//         acceptedFiles.forEach((file) => {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 setImageData(reader.result);
//             };

//             reader.readAsDataURL(file);
//         });
//     };

//     const onDrop1 = (acceptedFiles: File[]) => {
//         acceptedFiles.forEach((file) => {
//             // קבל את התמונה בפורמט base64
//             const reader = new FileReader();
//             reader.onload = () => {
//                 // המרת התמונה ל-HTML Image
//                 const img = new Image();
//                 setImageData(reader.result);
//                 img.src = reader.result;

//                 // שנה את גודל התמונה
//                 const newWidth = 300; // רוחב רצוי
//                 const newHeight = 220; // גובה רצוי
//                 const canvas = document.createElement('canvas');
//                 canvas.width = newWidth;
//                 canvas.height = newHeight;
//                 const ctx = canvas.getContext('2d');
//                 ctx.drawImage(img, 0, 0, newWidth, newHeight);
//                 ctx.font = "30px Arial";
//                 ctx.fillText("Hello World", 10, 50);

//                 // המרת התמונה לקובץ חדש בפורמט base64
//                 const resizedImageBase64 = canvas.toDataURL('image/jpeg');

//                 // יצירת Blob מהתמונה המוקטנת
//                 const blob = dataURItoBlob(resizedImageBase64);

//                 // שנה את שם הקובץ
//                 const newFileName = `new${file.name}`;

//                 // יצירת אובייקט עם הנתיב לתיקיית public
//                 const publicPath = import.meta.env.PUBLIC_URL;

//                 // יצירת נתיב מלא לתיקיית public
//                 const filePath = `${publicPath}/${newFileName}`;
                
//                 // יצירת URL לקובץ
//                 const fileUrl = URL.createObjectURL(blob);
//                 setImageData(resizedImageBase64 );

//                 // יצירת קישור להורדת הקובץ
//                 const downloadLink = document.createElement('a');
//                 downloadLink.href = fileUrl;
//                 downloadLink.download = newFileName;

//                 // הוסף את הקישור לדף
//                 document.body.appendChild(downloadLink);

//                 // לחץ על הקישור כדי להוריד את הקובץ
//                 downloadLink.click();

//                 // הסר את הקישור מהדף
//                 document.body.removeChild(downloadLink);
//             };

//             reader.readAsDataURL(file);
//         });
//     };

//     const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setWidth(Number(e.currentTarget.value));
//     };

//     const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setHeight(Number(e.currentTarget.value));
//     };

//     const handleCrop = () => {
//         // כאן תוכל לשלוח את התמונה המעודכנת לשרת
//         console.log('Sending updated image to the server');
//     };

//     const {
//         getRootProps,
//         getInputProps,
//         isFocused,
//         isDragAccept,
//         isDragReject
//     } = useDropzone({ accept: { 'image/*': [] }, onDrop: onDrop1 });

//     const style = useMemo(() => ({
//         ...baseStyle,
//         ...(isFocused ? focusedStyle : {}),
//         ...(isDragAccept ? acceptStyle : {}),
//         ...(isDragReject ? rejectStyle : {})
//     }), [
//         isFocused,
//         isDragAccept,
//         isDragReject
//     ]);


//     return (
//         <>
//             <section className="container">
//                 <Box sx={style} {...getRootProps()}>
//                     <input {...getInputProps({ title: 'Drop files here' })} />
//                     <p>Drag 'n' drop some files here, or click to select files</p>
//                 </Box>
//                 <aside>
//                     <h4>Files</h4>
//                     {/* <ul>{files}</ul> */}
//                 </aside>
//             </section>
//             {imageData && (
//                 <div>
//                     <h3>Selected Image</h3>
//                     {typeof imageData === 'string' ? (
//                         <img src={imageData} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
//                     ) : (
//                         <span>Unsupported image type</span>
//                     )}
//                     <div>
//                         <label htmlFor="widthInput">Width:</label>
//                         <input
//                             type="number"
//                             id="widthInput"
//                             value={width}
//                             onChange={handleWidthChange}
//                             min={1}
//                             max={1000}
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="heightInput">Height:</label>
//                         <input
//                             type="number"
//                             id="heightInput"
//                             value={height}
//                             onChange={handleHeightChange}
//                             min={1}
//                             max={1000}
//                         />
//                     </div>
//                     <button onClick={handleCrop}>Crop Image</button>
//                 </div>
//             )}
//         </>
//     );
// };



// // פונקציה להמרת נתוני base64 ל-Blob
// function dataURItoBlob(dataURI: string) {
//     const byteString = atob(dataURI.split(',')[1]);
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ab], { type: 'image/jpeg' });
// }

// export default UpImageBanner