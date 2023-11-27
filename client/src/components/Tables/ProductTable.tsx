import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'quantity', headerName: 'Quantity', width: 70 },
  { field: 'rating', headerName: 'Rate', width: 80 },
  { field: 'clickCount', headerName: 'Clicks Number', width: 70 },
  { field: 'salePrice', headerName: 'Price', width: 80 },
  { field: 'discountPercentage', headerName: 'Discount', width: 70 },
  { field: 'realPrice', headerName: 'Speciel Price', width: 80 },
  { field: 'description', headerName: 'Description', width: 350 }
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
        id: element.id,
        name: element.name,
        category: element.category,
        quantity: element.quantity,
        clickCount: element.click,
        rating: element.rating,
        salePrice: element.salePrice,
        discountPercentage: element.discountPercentage,
        realPrice: (element.salePrice - (element.salePrice * element.discountPercentage / 100)),
        description: element.description
      })
  })
  return (
    <div style={{ height: 400, width: '100%' }}>
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
    </div>
  );
}
