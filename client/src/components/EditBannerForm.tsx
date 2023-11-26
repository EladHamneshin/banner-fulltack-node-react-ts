import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const EditBannerForm = () => {

  const navigate = useNavigate();
  const handelClickLogin = () => { navigate(`/login`) }
  if (localStorage.getItem('token') === null) { handelClickLogin() }

  return (
    <Box>EditBannerForm</Box>
  )
}

export default EditBannerForm