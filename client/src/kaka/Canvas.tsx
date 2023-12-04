import { Box, Button, Dialog, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useRef, useState } from "react";
import { Product } from "../types/ProductInterface";



const API_URL = import.meta.env.VITE_API_URI;

interface BannerCanvasProps {
    width: number;
    height: number;
    product: Product;
  }

const images = [
    { src: `${API_URL}/backround/1.jpg`, name: 'Background 1' },
    { src: `${API_URL}/backround/2.jpg`, name: 'Background 2' },
    { src: `${API_URL}/backround/3.jpg`, name: 'Background 3' },
    { src: `${API_URL}/backround/4.jpg`, name: 'Background 4' },
];
const Canvas = (props : BannerCanvasProps) => {
    const [open, setOpen] = React.useState(false);
    
    const product = props.product
    const width = props.width
    const height = props.height
    
    
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const [bgImage, setBgImage] = useState<string | undefined>();
    const [text, setText] = useState('');
  
    const [element, setElement] = useState({
      image: product.image.url,
      x: 20,
      y: 60,
      isDragging: false,
    });
  
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    const setDimensions = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    };
  
    const handleBackgroundClicked = (bg: { src: string }) => {
      setBgImage(bg.src);
    };
  
    const handleTextClicked = (newText: string) => {
      setText(newText);
    };
  
    // const handleDownloadClick = () => {
    //   const canvas = canvasRef.current;
    //   if (canvas) {
    //     const dataUrl = canvas.toDataURL();
    //     downloadFromDataUrl(dataUrl, 'banner.png');
    //   }
    // };
  
    // const startDragging = () => {
    //   setElement((prevState) => ({
    //     ...prevState,
    //     isDragging: true,
    //   }));
    // };
  
    // const stopDragging = () => {
    //   setElement((prevState) => ({
    //     ...prevState,
    //     isDragging: false,
    //   }));
    // };
  
    // const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    //   if (element.isDragging) {
    //     setElement((prevState) => ({
    //       ...prevState,
    //       x: e.clientX,
    //       y: e.clientY,
    //     }));
    //   }
    // };
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
  
      // Draw background
      if (bgImage && ctx) {
        const bgImg = new Image();
        bgImg.src = bgImage;
        bgImg.onload = () => ctx.drawImage(bgImg, 0, 0, width, height);
      }
  
      // Draw product Image
      const img = new Image();
      img.src = element.image;
      img.onload = () => {
        ctx?.drawImage(img, element.x, element.y);
      };
  
      // Draw text
      if (ctx) {
        ctx.font = '20px Sans-Serif';
        ctx.fillText(text, 20, 40);
      }
    }, [bgImage, element, text, width, height]);
  
    const handleButtonClick = () => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');

        const secondImage = new Image();
        secondImage.src = props.product.image.url;
        secondImage.onload = function () {
            const scaleRatio = 0.25;
            const scaledWidth = secondImage.width * scaleRatio;
            const scaledHeight = secondImage.height * scaleRatio;
            const x = (canvas.width / 4) - scaledWidth / 2;
            const y = (canvas.height - scaledHeight) / 2;

            context!.drawImage(secondImage, x, y, scaledWidth, scaledHeight);
        };
    };

    const handleClickChangeBackround = (src: string) => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        const backgroundImage = new Image();
        backgroundImage.src = src;
        backgroundImage.onload = function () {
            context!.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        };
    };

    const handleClickAddText = (text: string) => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');

        context!.imageSmoothingEnabled = false;

        const fontSize = canvas.width / 20;
        context!.font = `${fontSize}px Arial`;
        context!.fillStyle = 'white';

        const textWidth = context!.measureText(text).width;
        const x = canvas.width - textWidth - 10;
        const y = canvas.height / 2;

        context!.fillText(text, x, y);
    };

    return (
        <Box>
            <Button variant="outlined" onClick={handleClickOpen}>
                Slide in alert dialog
            </Button>
            <Dialog
                fullScreen
                open={open}
                keepMounted
                onClose={handleClose}
            >
                <Box sx={{ padding: 13 }}>
                    <Typography variant="h5">new banner</Typography>
                    <canvas
                        id="myCanvas"
                        style={{
                            border: '1px solid black',
                            
                            width: 650,
                            height: 120,
                        }}
                    ></canvas>
                    <Typography variant="h6">choose background</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            padding: '2px',
                            justifyContent: 'space-around',
                            flexWrap: 'wrap',
                        }}
                    >

                        {images.map((image, index) => (
                            <img
                                key={index}
                                onClick={() => {
                                    handleClickChangeBackround(image.src);
                                }}
                                src={image.src}
                                style={{ padding: '4px' }}
                                width="200px"
                                alt={image.name}
                            ></img>
                        ))}


                    </Box>
                    <Button onClick={handleButtonClick}>add product image</Button>
                    <Typography variant="h6">choose text</Typography>
                    <Box>
                        <Button onClick={() => handleClickAddText(props.product.name)}>
                            Name: {props.product.name}
                        </Button>
                        <Button onClick={() => handleClickAddText(props.product.discount.toString())}>
                            discount: {`${props.product.discount} %`}
                        </Button>
                        <Button onClick={() => handleClickAddText("Additional Text")}>
                            Add Additional Text
                        </Button>
                    </Box>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </Box>
            </Dialog>
        </Box>
    );
};

export default Canvas;

