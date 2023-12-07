import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { UserInterface } from '../../types/UserInterface';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#FF9800',
    },
    info: {
      main: '#1976D2',
    },
  },
});

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'E-Mail', width: 200 },
  { field: 'isAdmin', headerName: 'Admin Permission?', width: 150 },
];

const UserTable = ({ users }: { users: UserInterface[] }) => {
  const rows = users.map((user, index) => ({
    id: user._id || index,
    name: user.name,
    email: user.email,
    isAdmin: user.isadmin.toString(),
  }));

  return (
    <Box sx={{ height: 400, width: '100%', backgroundColor: theme.palette.background.paper, borderRadius: '8px', overflow: 'hidden', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <ThemeProvider theme={theme}>
        <Typography variant="h5" sx={{ margin: '20px', display: 'flex', justifyContent: 'center', color: theme.palette.primary.main }}>
          All Users
        </Typography>
      </ThemeProvider>
      {rows.length === 0 ? (
        <Typography variant="h6" color="info" sx={{ textAlign: 'center', margin: '20px', color: theme.palette.info.main }}>
          No users available
        </Typography>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSizeOptions={[2, 5, 10, 25]}
          // disableRowSelectionOnClick
          getRowId={(row) => (typeof row.id === 'boolean' ? row.id.toString() : row.id)}
        />
      )}
    </Box>
  );
};

export default UserTable;
