// import React, { useEffect, useState } from 'react'
// import ProductTable from '../components/Tables/ProductTable'
// import UserTable from '../components/Tables/UserTable'
// import { Box } from '@mui/system'
// import { getAllUsers } from '../api/users/getUsersFetch'
// import { useNavigate } from 'react-router-dom'
// import { ResponseBanner } from '../types/BannerInterface'
// import { UserInterface } from '../types/UserInterface'

// type Props = {}

// const HomePage = (props: Props) => {
//     const [message, setMessage] = useState('');
//     const [user, setUser] = useState<UserInterface[] | null>(null);
//     const [noUserMessage, setNoUserMessage] = useState(''); // New state for no user message
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     const handleLoginRedirect = () => {
//         navigate('/login');
//     };

//     useEffect(() => {
//         if (localStorage.getItem('token') === null) {
//             handleLoginRedirect();
//         }
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const result = await getAllUsers();
//                 const data: UserInterface[] = result.data;

//                 if (data.length === 0) {
//                     setNoUserMessage('There are no users');
//                 } else {
//                     setUser(data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user:', error);
//                 setMessage('Error fetching user');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <>
//             <Box>
//                 <ProductTable prod={[]} />
//             </Box>
//             <Box>
//                 {noUserMessage ? (
//                     <p>{noUserMessage}</p>
//                 ) : (
//                     <UserTable user={user} />
//                 )}
//             </Box>
//         </>
//     )
// }

// export default HomePage
