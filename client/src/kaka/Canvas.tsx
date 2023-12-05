import { Box, Button, Dialog, Slide, Typography } from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import { Product } from "../types/ProductInterface";
import { VpnKeyOff } from "@mui/icons-material";



const API_URL = import.meta.env.VITE_API_URI;

interface BannerCanvasProps {
    width: number;
    height: number;
    product: Product;
}

const images = [
    { src: `/reka/1.svg`, name: 'Background 1' },
    { src: `/reka/2.svg`, name: 'Background 2' },
    { src: `/reka/3.svg`, name: 'Background 3' },
    { src: `/reka/4.svg`, name: 'Background 4' },
    { src: `/reka/5.svg`, name: 'Background 5' },
    { src: `/reka/6.svg`, name: 'Background 6' },
    { src: `/reka/7.svg`, name: 'Background 7' },
    { src: `/reka/8.svg`, name: 'Background 8' },
];
const Canvas = (props: BannerCanvasProps) => {

    const product = props.product
    const width = props.width
    const height = props.height

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [bgImage, setBgImage] = useState<string | undefined>();
    const [combinedText, setCombinedText] = useState({
        text1: '',
        text2: '',
        text3: '',
    });

    const [element, setElement] = useState({
        image: product.image.url,
        x: 20,
        y: 60,
     
    });

    const canvasRef = useRef<HTMLCanvasElement>(null);


    const [history, setHistory] = useState<any[]>([]); // או תשתמש בסוג הנכון של היסטוריה שלך

    const handleUndo = () => {
        if (history.length > 0) {
            console.log("Before undo:", { bgImage, element, combinedText }); // הדפסה לפני השינוי
            const canvas = canvasRef.current;
            const context = canvas!.getContext('2d');
    
            // עדכון הקנבס לפי ההיסטוריה
            history.slice(0, -1).forEach((canvasState) => {
                // עדכון נתוני הקנבס לפי המצב בהיסטוריה
                setBgImage(canvasState.bgImage);
                setElement(canvasState.element);
                setCombinedText(canvasState.combinedText);
            });
    
            // עדכון ההיסטוריה ללא השלב האחרון
            setHistory(history.slice(0, -1));
    
            console.log("After undo:", { bgImage, element, combinedText }); // הדפסה אחרי השינוי
        }
    };
    



    // const setDimensions = () => {
    //     const canvas = canvasRef.current;
    //     if (canvas) {
    //         canvas.width = width;
    //         canvas.height = height;
    //     }
    // };

    const handleBackgroundClicked = (bg: { src: string }) => {
        setBgImage(bg.src);
    };
    const handleProductImangeClicked = () => {
        setElement({
            image: product.image.url,
            x: 20,
            y: 50,
        })
    };

    const handleTextClicked1 = (newText: string) => {
        setCombinedText((prev) => ({ ...prev, text1: newText }));
    };

    const handleTextClicked2 = (newText: string) => {
        setCombinedText((prev) => ({ ...prev, text2: newText }));
    };

    const handleTextClicked3 = (newText: string) => {
        setCombinedText((prev) => ({ ...prev, text3: newText }));
    };

    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        // Draw background
        if (bgImage && ctx) {
            const bgImg = new Image();
            bgImg.src = bgImage;
            bgImg.onload = () => ctx.drawImage(bgImg, 0, 0, width, height);
        }
    }, [bgImage,]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');


        // Draw product Image
        const img = new Image();
        img.src = element.image;
        img.onload = () => {
            ctx?.drawImage(img, element.x, element.y);
        };
    }, [element]);


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        // Draw text name
        if (ctx) {
            ctx.font = '40px Arial';
            const textWidth = ctx.measureText(combinedText.text1).width;
            const x = (canvas!.width - textWidth - 10) / 2;
            const y = canvas!.height / 4;
            ctx.fillText(combinedText.text1, x, y);
        }

        // Draw text discount
        if (ctx) {
            ctx.font = '60px sans-serif';
            const textWidth = ctx.measureText(combinedText.text2).width;
            const x = (canvas!.width - textWidth - 10) / 2;
            const y = canvas!.height / 2;
            ctx.fillText(combinedText.text2, x, y);
        }

        // Draw text free text
        if (ctx) {
            ctx.font = '20px sans-serif';
            const textWidth = ctx.measureText(combinedText.text3).width;
            const x = (canvas!.width - textWidth - 10) / 1.5;
            const y = canvas!.height / 1.4;
            ctx.fillText(combinedText.text3, x, y);
        }
    }, [combinedText]);




    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        // Draw text ט.ל.ח
        if (ctx) {
            const text = 'ט.ל.ח. | עד גמר המלאי';
            ctx.font = '20px sans-serif';
            const textWidth = ctx.measureText(text).width;
            const x = (canvas!.width - textWidth - 10);
            const y = canvas!.height - 2;
            ctx.fillText(text, x, y);
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            // const context = canvas.getContext('2d');
            // context!.imageSmoothingEnabled = true;
            // context!.imageSmoothingQuality = 'high';

            // שמירת ההיסטוריה
            const currentCanvasState = {
                bgImage,
                element,
                combinedText,
            };

            setHistory(prev => [...prev, currentCanvasState]);
        }
    }, [bgImage, element, combinedText, width, height]);

    useEffect(() => {
        const startEffect = async () => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');

            if (ctx) {
                // שמירת ההיסטוריה
                for (const canvasState of history) {
                    const { bgImage, element, combinedText } = canvasState;

                    // Draw background
                    if (bgImage) {
                        const bgImg = new Image();
                        await new Promise((resolve) => {
                            bgImg.onload = resolve;
                            bgImg.src = bgImage;
                        });
                        ctx.drawImage(bgImg, 0, 0, width, height);
                    }

                    // Draw product Image
                    const img = new Image();
                    await new Promise((resolve) => {
                        img.onload = resolve;
                        img.src = element.image;
                    });
                    ctx.drawImage(img, element.x, element.y);

                    // Draw text name
                    ctx.font = '40px Arial';
                    const textWidth1 = ctx.measureText(combinedText.text1).width;
                    const x1 = (canvas!.width - textWidth1 - 10) / 2;
                    const y1 = canvas!.height / 4;
                    ctx.fillText(combinedText.text1, x1, y1);

                    // Draw text discount
                    ctx.font = '60px sans-serif';
                    const textWidth2 = ctx.measureText(combinedText.text2).width;
                    const x2 = (canvas!.width - textWidth2 - 10) / 2;
                    const y2 = canvas!.height / 2;
                    ctx.fillText(combinedText.text2, x2, y2);

                    // Draw text free text
                    ctx.font = '20px sans-serif';
                    const textWidth3 = ctx.measureText(combinedText.text3).width;
                    const x3 = (canvas!.width - textWidth3 - 10) / 1.5;
                    const y3 = canvas!.height / 1.4;
                    ctx.fillText(combinedText.text3, x3, y3);

                }
            } 
        }
        startEffect()
    }, [history, width, height]);


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
                    <canvas ref={canvasRef} width={width} height={height} style={{ border: '1px solid black' }}

                    />

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
                                    handleBackgroundClicked({ src: image.src });
                                }}
                                src={image.src}
                                style={{ padding: '4px' }}
                                width="200px"
                                alt={image.name}
                            ></img>
                        ))}

                    </Box>
                    {/* <Button onClick={handleButtonClick}>add product image</Button> */}
                    <Button onClick={handleProductImangeClicked}>add product</Button>
                    <Typography variant="h6">choose text</Typography>
                    <Box>
                        <Button onClick={() => handleTextClicked1(props.product.name)}>
                            Name: {props.product.name}
                        </Button>
                        <Button onClick={() => handleTextClicked2(`Discount: ${props.product.discount} %`)}>
                            discount: {`${props.product.discount} %`}
                        </Button>
                        <Button onClick={() => handleTextClicked3("Additional Text")}>
                            Add Additional Text
                        </Button>
                    </Box>
                    <Button onClick={handleClearCanvas}>Clear Canvas</Button>


                    <Button onClick={handleUndo}>Undo</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </Box>
            </Dialog>
        </Box>
    );
};

export default Canvas;






