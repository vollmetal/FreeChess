import { Box, Button, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from 'react-router-dom'
import { socket } from "..";
import { auth, logout } from "../Functions/firestore";




const Header = () => {
    const [user, loading, error] = useAuthState(auth)

    socket.on('connect', (arg) => {
        
    })

    return (
        <Box>
            <NavLink to='/'><Button variant="contained" >Main Page</Button> </NavLink>
            <NavLink to='/game'><Button variant="contained" >Game</Button> </NavLink>
            {user ? <Typography>Logged in as {user.displayName}</Typography>: null}
            {!user ? <NavLink to='/login'><Button variant="contained" >Login</Button> </NavLink>:<Button onClick={logout} variant="contained" >Logout</Button>}
        </Box>
    )

}

export default Header;