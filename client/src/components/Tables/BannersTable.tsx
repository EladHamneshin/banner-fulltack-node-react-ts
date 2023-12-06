import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ResponseBanner } from '../../types/BannerInterface';
import { Box, ThemeProvider } from '@mui/system';
import { Typography, createTheme } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'Name', headerName: 'Name', width: 150, type: 'string' },
  { field: 'productID', headerName: 'Product', type: 'string', width: 100 },
  { field: 'categoryID', headerName: 'Category', type: 'string', width: 100 },
  { field: 'author', headerName: 'Author', type: 'string', width: 100 },
  { field: 'creationDate', headerName: 'Creation Date', type: 'string', width: 100 },
];

type Props = {
  pro: ResponseBanner[];
};

export default function BannersTable(props: Props) {
  const rows: any = [];
  props.pro.forEach((element, index) => {
    rows.push({
      id: index + 1,
      Name: element.name,
      productID: element.productID,
      categoryID: element.catogryID,
      author: element.author,
      creationDate: element.createdAt,
    });
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2196F3',
      },
      secondary: {
        main: '#FF9800',
      },
    },
    typography: {
      h5: {
        fontSize: '1.2rem',
        '@media (min-width:400px)': {
          fontSize: '2rem',
        },
        '@media (min-width:960px)': {
          fontSize: '2rem',
        },
        color: '#2196F3',
      },
    },
  });

  return (
    <Box sx={{ height: '60vh', width: '40vw' }}>
      <ThemeProvider theme={theme}>
        <Typography variant="h5" sx={{ margin: '20px', display: 'flex', justifyContent: 'center', color: theme.palette.primary.main }}>
          All Banners
        </Typography>
      </ThemeProvider>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        pageSizeOptions={[2, 5, 10, 25]}
        getRowId={(row) => row.id}
        components={{
          NoRowsOverlay: () => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                color: theme.palette.secondary.main,
              }}>
              No banners available.
            </Box>
          ),
        }} />
    </Box>
  );
}
