import { Box, Button, Dialog, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});



type Props = {
};

const Canvas: React.FC<Props> = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleCanvasClick = () => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        context!.fillStyle = 'blue';
        context!.fillRect(8, 7, 166, 222);
        context!.fillStyle = 'red';
        context!.beginPath();
        context!.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI);
        context!.fill();
    };

    const handleButtonClick = () => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        const backgroundImage = new Image();
        backgroundImage.src = 'https://zem.outbrainimg.com/p/srv/sha/b9/17/f1/8cafebcb972772c952fbbd1cc7991f86e8.jpg?w=300&h=157&fit=fill&fill=blur&thomcrop&q=45&fm=jpg&testgroup';
        backgroundImage.onload = function () {
            context!.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        };

        const secondImage = new Image();
        secondImage.src = 'https://zem.outbrainimg.com/p/srv/sha/8a/69/5c/373dcc646a5bd26fba1369fa9aedbeff94.jpg?w=300&h=157&fit=crop&crop=edges&thomcrop&q=45&fm=jpg&auto=enhance&testgroup'; // שנה לנתיב של תמונת הרקע השנייה
        secondImage.onload = function () {
            // מיקום מסוים וגודל רבע מהתמונה הרקעית
            const x = 50;
            const y = 30;
            const width = canvas.width / 4;
            const height = canvas.height / 4;

            context!.drawImage(secondImage, x, y, width, height);
        };

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
                aria-describedby="alert-dialog-slide-description"
            >
                <Box sx={{ padding: 13, }}>
                    <Typography variant="h5">new banner</Typography>
                    <canvas onClick={handleCanvasClick} id="myCanvas"
                        style={{
                            border: '1px solid black',
                            objectFit: 'cover',
                            width: 720,
                            height: 100,
                        }}></canvas>
                        <img src="https://drive.google.com/file/d/1-hIgSFC7TfWQUVU8MYMK_aKgTpRc1m0r/view?usp=sharing" alt="reka1"></img>
                    <Button onClick={handleButtonClick}>Change Background</Button>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </Box>
            </Dialog>
        </Box>
    );
};

export default Canvas;
