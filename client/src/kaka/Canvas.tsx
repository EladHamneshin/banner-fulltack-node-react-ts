import { Box, Button, Dialog, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { Product } from "../types/ProductInterface";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const API_URL = import.meta.env.VITE_API_URI;

type Props = {
    product: Product;
};

const Canvas: React.FC<Props> = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const images = [
        { src: `${API_URL}/backround/1.jpg`, name: 'Background 1' },
        { src: `${API_URL}/backround/2.jpg`, name: 'Background 2' },
        { src: `${API_URL}/backround/3.jpg`, name: 'Background 3' },
        { src: `${API_URL}/backround/4.jpg`, name: 'Background 4' },
    ];

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
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <Box sx={{ padding: 13 }}>
                    <Typography variant="h5">new banner</Typography>
                    <canvas
                        id="myCanvas"
                        style={{
                            border: '1px solid black',
                            objectFit: 'cover',
                            width: 2000,
                            height: 200,
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
                        <Button onClick={() => handleClickAddText(props.product.discountPercentage.toString())}>
                            discount: {props.product.discountPercentage}
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

