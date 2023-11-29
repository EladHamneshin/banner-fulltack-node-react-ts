import { useEffect } from 'react';
import ProductTable from '../components/Tables/ProductTable';
import { Box } from '@mui/system';
// import { getAllUsers } from '../api/users/getUsersFetch';
import { useNavigate } from 'react-router-dom';
// import { UserInterface } from '../types/UserInterface';
import BannersTable from '../components/Tables/BannersTable';
import AllbannersHomePage from './bannersPages/AllbannersHomePage';

const HomePage = () => {
    // const [, setMessage] = useState('');
    // const [, setUser] = useState<UserInterface[] | null>(null);
    // const [, setNoUserMessage] = useState('');
    // const [, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            handleLoginRedirect();
        }
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const result = await getAllUsers();
    //             const data: UserInterface[] = result.data;

    //             if (data.length === 0) {
    //                 setNoUserMessage('There are no users');
    //             } else {
    //                 setUser(data);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching user:', error);
    //             setMessage('Error fetching user');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     // fetchData(); // Uncomment this line
    // }, []);

    return (
        <Box>
            <Box
                sx={{
                    // maxHeight: 400,
                    maxWidth: '80%',
                    // border: '2px solid black'
                }}>
                <AllbannersHomePage />
            </Box>
            <Box sx={{
                width: '45%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 2,
                gap: 2, // Adjust gap between the two boxes
            }}>
                <Box sx={{ flex: 1 }}>
                    <BannersTable pro={[]} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <ProductTable prod={[]} />
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;
