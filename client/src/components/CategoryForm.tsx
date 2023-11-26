import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';


const CategoryForm = () => {

  const navigate = useNavigate();
  const handelClickLogin = () => { navigate(`/login`) }
  if (localStorage.getItem('token') === null) { handelClickLogin() }

  return (
    <Box>CategoryForm</Box>
  )
}

export default CategoryForm