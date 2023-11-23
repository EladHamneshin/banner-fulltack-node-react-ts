import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {}

const HomePage = (props: Props) => {

    const navigate = useNavigate();
    const handelClickLogin = () => { navigate(`/login`) }
    if (localStorage.getItem('token') === null) { handelClickLogin() }

    return (
        <div>HomePage</div>
    )
}

export default HomePage