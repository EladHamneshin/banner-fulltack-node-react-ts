import { Button } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  image: {
    url: string
  },
  position: {
    x: number,
    y: number  
  },
  onChange: (position: {
    x: number,
    y: number  
  }) => void
}

const ProductImage: React.FC<Props> = ({
  canvasRef,
  image, 
  position,
  onChange  
}) => {

  // const [dragging, setDragging] = useState(false);
  const [imgPosition, setImgPosition] = useState(position);

  // יש להגדיר את img מחוץ לפונקציה
  const img = new Image();
  img.src = image.url;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    img.onload = () => {
      // התמונה תאותחל למיקום קצה הקנבס
      setImgPosition({
        x: canvas!.width - img.width,
        y: canvas!.height - img.height
      });
      ctx?.drawImage(img, imgPosition.x, imgPosition.y);
    };
  }, [image, position]);

  // const handleMouseDown = (e: React.MouseEvent) => {
  //   setDragging(true);
  // }
  
  // const handleMouseUp = (e: React.MouseEvent) => {
  //    setDragging(false);
  //    onChange(imgPosition);
  // }
  
  // const handleMouseMove = (e: React.MouseEvent) => {
  //    if (dragging) {
  //      // היכנס במקרה של גרירה רק בתוך גבולות הקנבס
  //      const newX = Math.min(Math.max(e.clientX - img.width, 0), canvasRef.current!.width - img.width);
  //      const newY = Math.min(Math.max(e.clientY - img.height, 0), canvasRef.current!.height - img.height);

  //      setImgPosition({
  //        x: newX,
  //        y: newY
  //      });
  //    }
  // }

  const handleSetPos = () => {
    onChange(imgPosition);
  }

  return (<>
  <Button onClick={handleSetPos}>add product image</Button>
  </>
    // <img  
    //   src={image.url}
    //   alt="p"
    //   style={{
    //     position: "absolute",
    //     left: imgPosition.x, 
    //     top: imgPosition.y
    //   }}
      // onMouseDown={handleMouseDown}
      // onMouseMove={handleMouseMove}
      // onMouseUp={handleMouseUp}
    // />
  );
}

export default ProductImage;
