import { Box } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Props = {}

const BannerCreateOrEdit = (props: Props) => {

    const navigate = useNavigate();
    const handelClickLogin = () => { navigate(`/login`) }
    if (localStorage.getItem('token') === null) { handelClickLogin() }

    useParams
    return (
        <Box>BannerCreateOrEdit</Box>
    )
}

export default BannerCreateOrEdit