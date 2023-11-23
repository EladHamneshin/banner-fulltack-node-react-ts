import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

type Props = {}

const UpImageBanner = () => {

    const navigate = useNavigate();
    const handelClickLogin = () => { navigate(`/login`) }
    if (localStorage.getItem('token') === null) { handelClickLogin() }

    // const [imageData, setImageData] = useState(null);
    // const [width, setWidth] = useState(300); // רוחב רצוי כברירת מחדל
    // const [height, setHeight] = useState(200); // גובה רצוי כברירת מחדל

    // const onDrop = (acceptedFiles) => {
    //     acceptedFiles.forEach((file) => {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setImageData(reader.result);
    //         };

    //         reader.readAsDataURL(file);
    //     });
    // };

    // const handleWidthChange = (e :  React.InputHTMLAttributes<HTMLInputElement> ) => {
    //     setWidth(Number(e.target.value));
    // };

    // const handleHeightChange = (e : React.ChangeEventHandler<HTMLInputElement> ) => {
    //     setHeight(Number(e.target.value));
    // };

    // const handleCrop = () => {
    //     // כאן תוכל לשלוח את התמונה המעודכנת לשרת
    //     console.log('Sending updated image to the server');
    // };


    // const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <>
            {/* <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>

        </div>
        {imageData && (
                <div>
                    <h3>Selected Image</h3>
                    <img src={imageData} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                    <div>
                        <label>Width:</label>
                        <input type="number" value={width} onChange={handleWidthChange} />
                    </div>
                    <div>
                        <label>Height:</label>
                        <input type="number" value={height} onChange={handleHeightChange} />
                    </div>
                    <button onClick={handleCrop}>Crop Image</button> */}
            {/* </div>
            )} */}
        </>
    );
};


export default UpImageBanner