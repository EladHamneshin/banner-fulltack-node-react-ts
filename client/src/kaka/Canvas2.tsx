import React, { useState, useRef, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Product } from '../types/ProductInterface';

interface BannerCanvasProps {
  width: number;
  height: number;
  product: Product;
}
const API_URL = import.meta.env.VITE_API_URI;
const images = [
    { src: `${API_URL}/backround/1.jpg`, name: 'Background 1' },
    { src: `${API_URL}/backround/2.jpg`, name: 'Background 2' },
    { src: `${API_URL}/backround/3.jpg`, name: 'Background 3' },
    { src: `${API_URL}/backround/4.jpg`, name: 'Background 4' },
];
const BannerCanvas: React.FC<BannerCanvasProps> = ({ width, height, product }) => {
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

  const handleDownloadClick = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      downloadFromDataUrl(dataUrl, 'banner.png');
    }
  };

  const startDragging = () => {
    setElement((prevState) => ({
      ...prevState,
      isDragging: true,
    }));
  };

  const stopDragging = () => {
    setElement((prevState) => ({
      ...prevState,
      isDragging: false,
    }));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (element.isDragging) {
      setElement((prevState) => ({
        ...prevState,
        x: e.clientX,
        y: e.clientY,
      }));
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

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       canvas.addEventListener('mousedown', startDragging);
//       canvas.addEventListener('mousemove', handleMouseMove);
//       canvas.addEventListener('mouseup', stopDragging);

//       return () => {
//         canvas.removeEventListener('mousedown', startDragging);
//         canvas.removeEventListener('mousemove', handleMouseMove);
//         canvas.removeEventListener('mouseup', stopDragging);
//       };
//     }
//   }, [element.isDragging]);

  return (
    <Box>
      <Box>
        {images.map((bg, index) => (
          <img
            key={index}
            onClick={() => handleBackgroundClicked(bg)}
            src={bg.src}
            alt={`background-${index}`}
            style={{ cursor: 'pointer',width: '200px', margin: '4px' }}
          />
        ))}
      </Box>

      <Box>
        <Button onClick={() => handleTextClicked('Special Offer')} variant="outlined">
          Add text
        </Button>
      </Box>

      <canvas ref={canvasRef} width={width} height={height} style={{ border: '1px solid black' }} />

      <Box>
        <Button onClick={handleDownloadClick} variant="contained" color="primary">
          Download
        </Button>
      </Box>
    </Box>
  );
};

export default BannerCanvas;

function downloadFromDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
