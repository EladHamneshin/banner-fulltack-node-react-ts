import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {}

const EditBannerForm = (props: Props) => {

  const navigate = useNavigate();
  const handelClickLogin = () => { navigate(`/login`) }
  if (localStorage.getItem('token') === null) { handelClickLogin() }

  return (
    <Box>EditBannerForm</Box>
  )
}

export default EditBannerForm