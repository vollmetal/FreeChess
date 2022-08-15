import { Avatar, Box, Button, ThemeProvider, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom'
import { socket } from "..";
import { auth, logout } from "../Functions/firestore";
import { mainTheme } from "../Themes";




const Header = () => {
    const gameState = useSelector(state => state.game)
    const [user, loading, error] = useAuthState(auth)

    socket.on('connect', (arg) => {
        
    })

    const newPage = async () => {
        const data = {roomId: gameState.id, gameId: gameState.id, playerSide: gameState.clientPlayer}
        if(gameState.gameId != '' && gameState.clientPlayer > 0) {
            console.log(data)
            socket.emit('leaveRooms', data)
        } else {
            socket.emit('leaveRooms', {roomId: gameState.gameId})
        }
        
    }

    return (
        
        <Box sx={{display: 'flex', justifyContent: 'space-between', margin: '20px', background: mainTheme.palette.primary.light, padding: '40px', borderRadius: '5px'}}>
            <Typography variant="h4">FreeChess</Typography>
            <NavLink to='/'><Button onClick={newPage} sx={{margin: '10px'}} variant="contained" >Main Page</Button> </NavLink>
            <NavLink to='/game'><Button onClick={newPage} sx={{margin: '10px'}} variant="contained" >Game</Button> </NavLink>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                {user ? <Typography>Logged in as {user.displayName}</Typography>: null}
                {user && user.photoURL ? <Avatar src={user.photoURL}/>: user && user.displayName ? <Avatar>{user.displayName}</Avatar>: null}
                {!user ? <NavLink to='/login'><Button variant="contained" >Login</Button> </NavLink>:<Button onClick={logout} variant="contained" >Logout</Button>}
                {!user ? <NavLink to='/registration'><Button variant="contained" >Register</Button> </NavLink>: null}
            </Box>
            
        </Box>
    )

}

export default Header;