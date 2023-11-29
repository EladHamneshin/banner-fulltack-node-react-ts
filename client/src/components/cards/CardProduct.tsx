import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import { Product } from '../../types/ProductInterface';

interface ProductCardProps {
  product: Product;
}

const CardProduct: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card sx={{ width: '250px', height: '500px', margin: 2 }}>
      <CardMedia
        component="img"
        height="35%"
        image={product.image.url} // Replace with your product image URL
        alt={product.image.alt}
      />
      <CardContent sx={{
        background: '#f0f0f0',
        height: '60%',
        display: 'flex',
        padding: '16px',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        <Box sx={{ height: '100px' }}>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary"
            sx={{ display: 'flex' }}>
            {product.description}
          </Typography>
          {product.salePrice !== undefined && (
            <Typography variant="h6" color="text.secondary" gutterBottom>
              ${product.salePrice.toFixed(2)}
            </Typography>
          )}
          {product.discountPercentage > 0 && (
            <Typography color="error" variant="body2" gutterBottom>
              {product.discountPercentage}% off
            </Typography>
          )}
        </Box>
        <Box>
          <Button variant="contained" color="primary"
            sx={{
              marginTop: 5,
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
export default CardProduct;
