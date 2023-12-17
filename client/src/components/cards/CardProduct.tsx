import React from 'react';
import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Product } from '../../types/ProductInterface';

interface ProductCardProps {
  product: Product;
}

const CardProduct: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', width: '80%', margin: 2 }}>
      <Card sx={{ height: '70vh', width: '20vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <CardMedia
          component="img"
          height="40%"
          image={product.image.url}
          alt={product.image.alt}
          sx={CardMediaStyle}
        />
        <CardContent sx={CardContentStyle}>
          <Stack spacing={2}>

            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#2196F3', marginBottom: '10px' }}>
              {product.name}
            </Typography>

            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold' }}>
              Category: {product.category}
            </Typography>
            {product.salePrice !== undefined && (
              <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold' }}>
                Price: ${product.salePrice.toFixed(2)}
              </Typography>
            )}
            <Typography variant="body1" color="text.primary">
              Quantity: {product.quantity}
            </Typography>
            <Typography variant="body1" color="text.primary">
              Description: {product.description}
            </Typography>
            <Typography variant="body1" color="text.primary">
              Rating: {product.rating}/5
            </Typography>

          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardProduct;

const CardMediaStyle = {
  objectFit: 'cover',
};

const CardContentStyle = {
  flexDirection: 'column',
  background: '#f5f5f5',
  height: '60%',
  display: 'flex',
  padding: '16px',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'left',
  boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)',
};
