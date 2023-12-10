import express from 'express';
// import productControllers from '../controllers/productControllers.js';
import multer from 'multer'
import path from 'path'

const uploadRouter = express.Router();




let imageName = "";
const storage = multer.diskStorage({
    destination: path.join("public/images"),
    filename: function (req, file, cb) {
        // console.log(req.);
        console.log(file);
        
        imageName = file.originalname;
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 },
}).single("myImage");

uploadRouter.post("/image", (req, res) => {
    // const { data } = req.body;
    // console.log(data);
    console.log(req.body);
    



    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            return res.status(201)
                .json({ url: `${process.env.BANNER_BASE_URL}/images/${imageName}` }); 34
        }
    });
});



export default uploadRouter;