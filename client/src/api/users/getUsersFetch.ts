// import axios from 'axios';
// const API_URL = import.meta.env.VITE_API_URI


// export const getAllUsers = async () => {

//     let data = '';
//     let token = localStorage.getItem('banner_token');
//     if (!token) { token = ''}
    
    
//     let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `${API_URL}/users/`,
//         headers: { 
//             'Authorization': token, 
//             'Content-Type': 'application/json'
//           },
//         data: data
//     };
//     try {
//         const res = await axios.request(config)
//         return res.data
//     } catch (error) {
//         console.log(error);
//     }
// }

import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql`
  query {
    users {
      _id
      name
      email
      password
      isadmin
    }
  }
`;

const GetAllUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "Loading...";
  if (error) return error.message;
  return data
};

export default GetAllUsers
