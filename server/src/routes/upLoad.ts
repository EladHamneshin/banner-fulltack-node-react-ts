import express from 'express';
// import productControllers from '../controllers/productControllers';
import multer from 'multer'
import path from 'path'

const uploadRouter = express.Router();

let imageName = "";  
const storage = multer.diskStorage({
  destination: path.join("public/images"),
  filename: function (req, file, cb) {
    imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 },
}).single("myImage");
uploadRouter.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(201)
      .json({ url: "http://localhost:5000/images/" + imageName }); 34
}
});
});



export default uploadRouter;