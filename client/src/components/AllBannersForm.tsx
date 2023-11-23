import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const AllBannersForm = () => {

  const navigate = useNavigate();
  const handelClickLogin = () => { navigate(`/login`) }
  if (localStorage.getItem('token') === null) { handelClickLogin() }

  return (
    <Box>AllBannersForm</Box>
  )
}

export default AllBannersForm