// http://localhost:5000/api/bannersImage
import React, { useState } from 'react'

import Uploady from '@rpldy/uploady';
import UploadButton from '@rpldy/upload-button';
import { TextField } from '@mui/material';
import axios from 'axios';


type Props = {}
const handleChange = (e) => {
    // עיבוד קבצים כאן 
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('image', file);

};

function Kaka2({ }: Props) {
    const [image, setImage] = useState("");
    const [imageFile, setFile] = useState<any>();
    const getImage = (e) => {
      setFile(e.target.files[0]);
    }
    const uploadImage = (e) => {
      e.preventDefault()  //prevent browser to refresh
      const formData = new FormData();  //create new form object
      formData.append("myImage", imageFile);//add image to form object
      axios({
        method: "post",
        url: "http://localhost:5000/api/bannersImage/upload/image",
        data: formData,  //send image to server
      })
       .then((response) => {
        const { data } = response; //return image url of uploaded img
        setImage(data.url); //set url to image variable
      })
       .catch((err) => {
        console.log(err);
      });
    }
    return (
      <div className="App">
        <h4>Image from server</h4>
        <div className="imageBox">
          <img src={image} width="100%" alt='fff'></img>
        </div>
        <hr></hr>
        <h4>Image Preview</h4>
        <form onSubmit={uploadImage}>
          <input aria-label='rr' type="file" onChange={getImage}></input>
          <button type="submit">upload</button>
        </form>
      </div>
    );
}

export default Kaka2