import { Button, Card, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../Functions/firestore';


const Login = (props) => {

    const [loginCredentials, setLoginCredentials] = useState()
    const [user, loading, error] = useAuthState(auth)

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

    return (
        <Card>
            <Card>
                <TextField onChange={updateCredentials} id="outlined-basic" helperText="Email" name='email' variant="outlined" />
                <TextField type='password' onChange={updateCredentials} id="outlined-basic" helperText="Password" name='password' variant="outlined" />
                <Button variant='contained' onClick={() => {logInWithEmailAndPassword(loginCredentials.email, loginCredentials.password)}}>Login with Email and Password</Button>
            </Card>
            <Button variant='contained' onClick={signInWithGoogle}>Login with Google account</Button>
            <NavLink to='/registration'><Button variant='contained' >Register for a new account here if you don't have one</Button></NavLink>
        </Card>
    )

}


export default Login;