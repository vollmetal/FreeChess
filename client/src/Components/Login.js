import { Button, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle } from '../firestore';


const Login = (props) => {

    const [loginCredentials, setLoginCredentials] = useState()
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        if(loading) {

        }
        if(user) {
            console.log(user)
        }
    }, [user, loading])

    const updateCredentials = (e) => {
        setLoginCredentials({
            ...loginCredentials,
            [e.target.name]: e.target.value
        })
    }

    const googleLogin = () => {

    }

    return (
        <Card>
            <Button variant='contained' onClick={signInWithGoogle}>Login</Button>
        </Card>
    )

}


export default Login;