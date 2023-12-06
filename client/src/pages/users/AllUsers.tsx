import { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/users/getUsersFetch';
import { Box, Typography } from '@mui/material';
import UserTable from '../../components/Tables/UserTable';
import Circular from '../../components/Circular';
import { UserInterface } from '../../types/UserInterface';



const AllUsers = () => {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<UserInterface[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllUsers();
        if (result.success === false) {
          setMessage(result.message);
        } else if (result.success === true) {
          const data: UserInterface[] = result.data;
          // Adding unique id to each row
          const usersWithId = data.map((user, index) => ({ ...user, id: String(index) }));
          setUsers(usersWithId.length === 0 ? [] : usersWithId);
        }
      } catch (error) {
        console.error('Error fetching Users:', error);
        setMessage('No Users in DB');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <Circular />
        </Box>
      ) : (
        <>
          {message ? (
            <Typography variant="h6" color="error" sx={{ textAlign: 'center', margin: '20px' }}>
              {message}
            </Typography>
          ) : (
            <UserTable users={users || []} />
          )}
        </>
      )}
    </Box>
  );
};

export default AllUsers;
