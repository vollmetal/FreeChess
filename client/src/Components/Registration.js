import { Box, Button, Card, Container, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from '../Functions/firestore';





const Registration = () => {

    const [registerCredentials, setRegisterCredentials] = useState()
    const [user, loading, error] = useAuthState(auth)

    useEffect(() => {
        if (loading) {

        }
        if (user) {
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
        <Container component="main" maxWidth="xs">

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={updateCredentials}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={updateCredentials}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={updateCredentials}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => { registerWithEmailAndPassword(registerCredentials.username, registerCredentials.email, registerCredentials.password) }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Registration;