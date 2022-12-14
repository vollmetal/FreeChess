import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../Functions/firestore';


const Login = (props) => {

  const [loginCredentials, setLoginCredentials] = useState()
  const [user, loading, error] = useAuthState(auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {

    }
    if (user) {
    }
  }, [user, loading])

  const updateCredentials = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value
    })
  }

  const loginEmail = async () => {
    await logInWithEmailAndPassword(loginCredentials.email, loginCredentials.password)
    navigate('/')
  }

  const googleSignIn = async () => {
    await signInWithGoogle()
    navigate('/')
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
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
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
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={loginEmail}
          >
            Sign In
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={googleSignIn}
          >
            Sign In With Google
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )

}


export default Login;