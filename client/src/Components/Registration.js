import { Button, Card, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from '../Functions/firestore';

    



const Registration = () => {

    const [registerCredentials, setRegisterCredentials] = useState()
    const [user, loading, error] = useAuthState(auth)

    useEffect(() => {
        if(loading) {

        }
        if(user) {
            console.log(user)
        }
    }, [user, loading])

    const updateCredentials = (e) => {
        setRegisterCredentials({
            ...registerCredentials,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Card>
            <TextField onChange={updateCredentials} id="outlined-basic" helperText="Username" name='username' variant="outlined" />
            <TextField onChange={updateCredentials} id="outlined-basic" helperText="Email" name='email' variant="outlined" />
            <TextField type='password' onChange={updateCredentials} id="outlined-basic" helperText="Password" name='password' variant="outlined" />
            <Button variant='contained' onClick={() => {registerWithEmailAndPassword(registerCredentials.username, registerCredentials.email, registerCredentials.password)}}>Login with Email and Password</Button>
        </Card>
    )
}

export default Registration;