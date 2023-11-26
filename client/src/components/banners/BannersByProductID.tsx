import { Box } from '@mui/material'

import { useNavigate } from 'react-router-dom';



type Props = {}

const BannersByProductID = (props: Props) => {


  const navigate = useNavigate();
  const handelClickLogin = () => { navigate(`/login`) }
  if (localStorage.getItem('token') === null) { handelClickLogin() }


  return (
    <Box>BannersByProductForm</Box>
  )
}

export default BannersByProductID