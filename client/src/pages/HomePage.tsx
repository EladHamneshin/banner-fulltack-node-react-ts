import { useEffect, useState } from 'react';
import ProductTable from '../components/Tables/ProductTable';
import UserTable from '../components/Tables/UserTable';
import { Box } from '@mui/system';
import { getAllUsers } from '../api/users/getUsersFetch';
import { useNavigate } from 'react-router-dom';
import { UserInterface } from '../types/UserInterface';

const HomePage = () => {
    const [, setMessage] = useState('');
    const [, setUser] = useState<UserInterface[] | null>(null);
    const [noUserMessage, setNoUserMessage] = useState('');
    const [, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            handleLoginRedirect();
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllUsers();
                const data: UserInterface[] = result.data;

                if (data.length === 0) {
                    setNoUserMessage('There are no users');
                } else {
                    setUser(data);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setMessage('Error fetching user');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 2,
            gap: 2, // Adjust gap between the two boxes
        }}>
            <Box sx={{ flex: 1, minWidth: '100%' }}>
                <ProductTable prod={[]} />
            </Box>
            <Box sx={{ flex: 1 }}>
                {noUserMessage ? (
                    <p>{noUserMessage}</p>
                ) : (
                    <UserTable user={[]} />
                )}
            </Box>
        </Box>
    );
};

export default HomePage;
