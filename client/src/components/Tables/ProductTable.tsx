import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 20 },
  { field: 'name', headerName: 'Name', width: 40 },
  { field: 'category', headerName: 'Category', width: 80 },
  // { field: 'quantity', headerName: 'Quantity', width: 80 },
  { field: 'rating', headerName: 'Rate', width: 40 },
  // { field: 'clickCount', headerName: 'Clicks', width: 60 },
  { field: 'salePrice', headerName: 'Price', width: 50 },
  // { field: 'discountPercentage', headerName: 'Discount', width: 80 },
  { field: 'realPrice', headerName: 'Sale', width: 40 },
  // { field: 'description', headerName: 'Description', width: 110 }
];
export type product = {
  id: string;
  name: string;
  quantity: number;
  rating: number;
  category: string;
  salePrice: number;
  description: string;
  discountPercentage: number;
  click: number;
}
export default function ProductTable({ prod }: { prod: product[] }) {
  const rows: any = []
  prod.forEach(element => {
    rows.push(
      {
        // id: element.id,
        name: element.name,
        category: element.category,
        // quantity: element.quantity,
        // clickCount: element.click,
        rating: element.rating,
        salePrice: element.salePrice,
        // discountPercentage: element.discountPercentage,
        realPrice: (element.salePrice - (element.salePrice * element.discountPercentage / 100)),
        // description: element.description
      })
  })
  return (
    <Box sx={{ height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[2, 5, 10, 25]}
        checkboxSelection
      />
    </Box>
  );
}
