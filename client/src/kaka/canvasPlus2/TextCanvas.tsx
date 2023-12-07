import { useEffect, useRef, useState } from "react";
import { Product } from "../../types/ProductInterface";
import { TextCanvas } from "./CanvasPlus2";
import { Box, Button, TextField } from "@mui/material";


interface TextProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    product: Product
    text: TextCanvas;
    onChange: (text: TextCanvas) => void;
}

const Text: React.FC<TextProps> = ({canvasRef, product, text, onChange }) => {
    const freeTextRef = useRef<string>('');
    const [inputText, setInputText] = useState(text);

    
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    // Draw text name
    if (ctx) {
        ctx.font = '40px Arial';
        const textWidth = ctx.measureText(text.name).width;
        const x = (canvas!.width - textWidth - 10) / 2;
        const y = canvas!.height / 4;
        ctx.fillText(text.name, x, y);
    }

    // Draw text discount
    if (ctx) {
        ctx.font = '60px sans-serif';
        const textWidth = ctx.measureText(text.discount).width;
        const x = (canvas!.width - textWidth - 10) / 2;
        const y = canvas!.height / 2;
        ctx.fillText(text.discount, x, y);
    }

    // Draw text free text
    if (ctx) {
        ctx.font = '20px sans-serif';
        const textWidth = ctx.measureText(text.freeText).width;
        const x = (canvas!.width - textWidth - 10) / 1.5;
        const y = canvas!.height / 1.4;
        ctx.fillText(text.freeText, x, y);
    }
}, [text]);



    const handleTextNameChange = () => {
        const newText = product.name

        const newInputText = { ...inputText, name: newText }

        setInputText(newInputText);
        onChange(newInputText);
    }

    const handleTextDiscountChange = () => {
        const newText = `Discount: ${product.discount} %`

        const newInputText = { ...inputText, discount: newText }

        setInputText(newInputText);
        onChange(newInputText);
    }


    const handleTextFreeClick = () => {
        const newText = freeTextRef.current

        const newInputText = { ...inputText, freeText: newText }

        setInputText(newInputText);
        onChange(newInputText);
    }
    const handleTextFreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        freeTextRef.current = e.target.value;
    }

    return (
        <Box>
            <Button onClick={() => handleTextNameChange()}>
                Name: {product.name}
            </Button>
            <Button onClick={() => handleTextDiscountChange()}>
                discount: {`${product.discount} %`}
            </Button>
            <TextField
                label="free text"
                
                onChange={handleTextFreeChange}
            />
            <Button onClick={handleTextFreeClick}>
                send  text
            </Button>
        </Box>

    );
}

export default Text;