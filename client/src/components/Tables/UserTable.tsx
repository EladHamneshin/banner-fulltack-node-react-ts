import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { UserInterface } from '../../types/UserInterface';
// type User = {
//   _id?: string;
//   name: string;
//   email: string;
//   isadmin: boolean;
// }

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'E-Mail', width: 200 },
  { field: 'isadmin', headerName: 'Admin Permission?', width: 120 }
];
export default function UserTable({ user }: { user: UserInterface[] }) {
  const rows: any = []
  user.forEach(element => {
    rows.push(
      {
        id: element._id,
        name: element.name,
        email: element.email,
        isadmin: element.isadmin

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
