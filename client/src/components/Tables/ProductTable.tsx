import React from 'react';
import { Typography, createTheme, Theme } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Product } from '../../types/ProductInterface';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 100 },
  { field: 'category', headerName: 'Category', width: 100 },
  { field: 'rating', headerName: 'Rate', width: 100 },
  { field: 'salePrice', headerName: 'Price', width: 100 },
  { field: 'realPrice', headerName: 'Sale', width: 100 },
];

interface ProductTableProps {
  prod: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ prod }) => {
  const theme: Theme = createTheme({
    typography: {
      h5: {
        fontSize: '1.2rem',
        '@media (min-width:400px)': {
          fontSize: '2rem',
        },
        '@media (min-width:960px)': {
          fontSize: '2rem',
        },
      },
    },
    palette: {
      primary: {
        main: '#2196F3', // Blue
      },
      secondary: {
        main: '#FF9800', // Orange
      },
    },
  });

  const rows = prod.map((element, index) => ({
    id: index + 1, // Assuming index is a valid unique identifier
    name: element.name,
    category: element.category,
    rating: element.rating,
    salePrice: element.salePrice,
    realPrice: element.salePrice - (element.salePrice * element.discountPercentage) / 100,
  }));
  
  return (
    <Box sx={{ height: '60vh', width: '40vw' }}>
      <ThemeProvider theme={theme}>
        <Typography variant="h5" sx={{ margin: '20px', display: 'flex', justifyContent: 'center', color: theme.palette.primary.main }}>
          All Products
        </Typography>
      </ThemeProvider>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        pageSizeOptions={[2, 5, 10, 25]}
        checkboxSelection
        components={{
          NoRowsOverlay: () => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                color: theme.palette.secondary.main,
              }}
            >
              No products available.
            </Box>
          ),
        }}
      />
    </Box>
  );
};

export default ProductTable;
