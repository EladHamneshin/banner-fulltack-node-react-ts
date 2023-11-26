import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BannersByCategoryForm = () => {

  const navigate = useNavigate();
  const handelClickLogin = () => { navigate(`/login`) }
  if (localStorage.getItem('token') === null) { handelClickLogin() }

  return (
    <Box>BannersByCategoryForm</Box>
  )
}

export default BannersByCategoryForm