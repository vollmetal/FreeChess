import { useTheme } from "@emotion/react";
import { Avatar, Box, Button, Paper, ThemeProvider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom'
import { socket } from "..";
import { SERVER_PATH } from "../constants";
import { auth, logout } from "../Functions/firestore";
import { clearGame } from "../store/gameReducer";
import { login, logoutUser } from "../store/userReducer";




const Header = () => {

    const theme = useTheme()
    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)
    const [user, loading, error] = useAuthState(auth)

    const dispatch = useDispatch()

    socket.on('connect', (arg) => {

    })

    const loginUser = async () => {
        const result = await fetch(`${SERVER_PATH}/user/getuser/${user.uid}`)
        const userData = await result.json()
        if(userData.success) {
            console.log(userData.message)
            console.log(userData.data.player1Pieces)
            dispatch(login({email: user.email, displayName: user.displayName, photoURL: user.photoURL, playerPiece: [userData.data.player1Pieces, userData.data.player2Pieces], uiColors: userData.data.themeColors, boardColors: userData.data.boardColors}))

        } else {
            console.log(userData.message)
        }
        
    }

    const logoutClient = async () => {
        logout()
        dispatch(logoutUser())
    }

    useEffect(() => {
        if(user && userState.username === '') {
            loginUser()
        }
        console.log(theme)
    }, [user])

    const newPage = async () => {

        const data = { roomId: gameState.id, gameId: gameState.id, playerSide: gameState.clientPlayer }
        if (gameState.gameId != '' && gameState.clientPlayer > 0) {
            socket.emit('leaveRooms', data)
        } else {
            socket.emit('leaveRooms', { roomId: gameState.gameId })
        }
        dispatch(clearGame())
    }

    return (

        <Paper sx={{ display: 'flex', justifyContent: 'space-between', mb: '20px', padding: '40px', borderRadius: '5px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                <Typography variant="h4">FreeChess</Typography>
                <Box>
                    <NavLink style={{textDecoration: 'none'}} to='/'><Button onClick={newPage} sx={{ margin: '10px' }} variant="contained" >Main Page</Button></NavLink>
                    <NavLink style={{textDecoration: 'none'}} to='/game'><Button onClick={newPage} sx={{ margin: '10px' }} variant="contained" >Game</Button></NavLink>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                {user && user.photoURL ? <NavLink onClick={newPage} style={{textDecoration: 'none'}} to='/userpage'><Avatar sx={{height: 'auto', width: 'auto'}} src={user.photoURL} /></NavLink> : user && user.displayName ? <Avatar>{user.displayName[0]}</Avatar> : null}
                {!user ? <NavLink style={{textDecoration: 'none'}} to='/login'><Button onClick={newPage} variant="contained" >Login</Button> </NavLink> : <Button sx={{marginTop: '20px'}} color="warning" onClick={logoutClient} variant="contained" >Logout</Button>}
                {!user ? <NavLink style={{textDecoration: 'none'}} to='/registration'><Button onClick={newPage} variant="contained" >Register</Button> </NavLink> : null}
            </Box>

        </Paper>
    )

}

export default Header;