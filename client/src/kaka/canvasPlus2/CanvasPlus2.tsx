import { Box, Button, Dialog, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Product } from "../../types/ProductInterface";
import BackgroundImage from "./BgCanvas";

import Text from "./TextCanvas";
import useBoolean from "../../hooks/useBoolean";

import { fabric } from 'fabric';

interface BannerCanvasProps {
  // setCanvasImage: React.Dispatch<any>
  width: number;
  height: number;
  product: Product;
}
export interface TextCanvas {
  name: string;
  discount: string;
  freeText: string;
}
interface CanvasState {
  bgImage: string;
  productImage: fabric.Image | null,
  text: TextCanvas;
}

const CanvasPlus = (props: BannerCanvasProps) => {

  const {  product, width, height } = props

  const [open, handleClickOpen, handleClose] = useBoolean(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    bgImage: '',
    productImage: null,
    text: {
      name: '',
      discount: '',
      freeText: '',
    }
  });

  const [history, setHistory] = useState<CanvasState[] | []>([])
  const limit = 20;

  const pushToHistory = (state: CanvasState) => {
    if (history.length >= limit) {
      const updatedHistory = [...history];
      updatedHistory.shift();
      setHistory(updatedHistory);
    }
    const updatedHistory = [...history, state];
    setHistory(updatedHistory);
  };

  const undo = () => {
    if (history.length === 0) return;
    const prevState = history.pop()!;
    setCanvasState(prevState);
  };

  const updateBgImage = (bgImage: string) => {
    const newState = {
      ...canvasState,
      bgImage
    };

    pushToHistory(newState);
    setCanvasState(newState);
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
    }
  };


  const updateText = (text: TextCanvas) => {
    const newState = {
      ...canvasState,
      text
    };
    pushToHistory(newState);
    setCanvasState(newState);
  };

  useEffect(() => {
    const startEffect = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const fabricCanvas = new fabric.Canvas(canvasRef.current);

      if (ctx) {
        // שמירת ההיסטוריה
        const { bgImage, productImage, text } = canvasState;

        console.log(productImage);
        
        // Draw background
        if (bgImage) {
          await fabric.Image.fromURL(bgImage, img => {
            const scaleHeight = canvas!.height / img.height!;
            const scaleWidth = canvas!.width / img.width!;
            img.scaleY = scaleHeight;
            // השתמש בסקייל הגדול ביותר לרוחב
            // כדי למלא את הרוחב
            img.scaleX = Math.max(scaleWidth, scaleHeight);
            img.set({
              hasControls: false,
              evented: false
            });
            img.sendToBack();
            fabricCanvas.add(img);
          });
        }

        // Draw product Image
        await fabric.Image.fromURL(product.image.url, img => {
          if (img) {
            img.set({
              width: img.width,
              height: img.height,
              top: 0,
              left: 0,
              cornerSize: 6,
              transparentCorners: false,
              hasControls: true,
              hasBorders: true,
            });
            // הוסף את התמונה לקנבס
            fabricCanvas.add(img);
            // הגדר את התמונה כאובייקט פעיל בקנבס
            fabricCanvas.setActiveObject(img);
          }
        })



        // Draw text name
        if (text.name) {
          // const textWidth1 = ctx.measureText(text.name).width;
          const newText = new fabric.Text(text.name, {
            left: canvas!.height / 4,
            top: (canvas!.width - 10) / 2,
            fontFamily: 'Arial', // בחר גופן רצוי
            fontSize: 54, // בחר גודל רצוי
            fill: 'black', // בחר צבע רצוי
          });
          fabricCanvas.add(newText);
          newText.bringToFront();
          fabricCanvas.renderAll();

        }



        // Draw text discount
        // ctx.font = '60px sans-serif';
        // const textWidth2 = ctx.measureText(text.discount).width;
        // const x2 = (canvas!.width - textWidth2 - 10) / 2;
        // const y2 = canvas!.height / 2;
        // ctx.fillText(text.discount, x2, y2);

        // // Draw text free text
        // ctx.font = '20px sans-serif';
        // const textWidth3 = ctx.measureText(text.freeText).width;
        // const x3 = (canvas!.width - textWidth3 - 10) / 1.5;
        // const y3 = canvas!.height / 1.4;
        // ctx.fillText(text.freeText, x3, y3);

        // // Draw text ט.ל.ח
        // if (ctx) {
        //   const text = 'ט.ל.ח. | עד גמר המלאי';
        //   ctx.font = '20px sans-serif';
        //   const textWidth = ctx.measureText(text).width;
        //   const x = (canvas!.width - textWidth - 10);
        //   const y = canvas!.height - 2;
        //   ctx.fillText(text, x, y);
        // }
      }
    };
    startEffect();
  }, [canvasState, width, height]);


  const saveCanvas = () => {
    // const canvas = canvasRef.current;
    // const ctx = canvas!.getContext('2d');

    // ניצור אובייקט ImageData כדי לקבל את כל הפיקסלים בקנבס
    // const imageData = ctx!.getImageData(0, 0, width, height);

    // יצירת קובץ Blob מהתמונה
    // const blob = new Blob([imageData.data], { type: 'image/png' });
    // const file = new File([blob], `${product.name}.jpg`);
    // שמור בסטייט
    // setCanvasImage(blob);

    // אם יש לך צורך להוריד את התמונה לקובץ, תוכל ליצור קישור להורדה
    // const downloadLink = document.createElement('a');
    // downloadLink.href = URL.createObjectURL(blob);
    // downloadLink.download = 'canvas_image.png';
    // downloadLink.click();
  };




  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        create a new banner
      </Button>
      <Dialog
        fullScreen
        open={open}
        keepMounted
        onClose={handleClose}
      >
        <Box sx={{ padding: 23 }}>
          <Typography variant="h5">new banner</Typography>
          <canvas id="c10" ref={canvasRef} width={width} height={height} style={{ border: '1px solid black' }}

          />
          <BackgroundImage
          image={canvasState.bgImage}
            onChange={updateBgImage}
          />
          <Text
          canvasRef={canvasRef}
            product={product}
            text={canvasState.text}
            onChange={updateText}
          />

          <Button onClick={undo}>בטל</Button>
        </Box>
        <Button onClick={handleClearCanvas}>Clear Canvas</Button>
        <Button onClick={handleClose}>Agree</Button>
        <Button onClick={saveCanvas}>Save</Button>

      </Dialog>
    </Box>
  );
};

export default CanvasPlus;