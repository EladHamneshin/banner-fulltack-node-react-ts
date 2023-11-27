import { DataGrid, GridColDef } from '@mui/x-data-grid';

type User = {
  _id?: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'E-Mail', width: 200 },
  { field: 'isAdmin', headerName: 'Admin Permission?', width: 120 }
];
export default function UserTable({ user }: { user: User[] }) {
  const rows: any = []
  user.forEach(element => {
    rows.push(
      {
        id: element._id,
        name: element.name,
        email: element.email,
        isAdmin: element.isAdmin

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
