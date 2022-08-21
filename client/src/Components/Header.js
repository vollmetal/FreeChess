import { useTheme } from "@emotion/react";
import { Avatar, Box, Button, Paper, ThemeProvider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom'
import { socket } from "..";
import { SERVER_PATH, SERVER_PORT } from "../constants";
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
        const result = await fetch(`${SERVER_PATH}${SERVER_PORT}/user/getuser/${user.uid}`)
        const userData = await result.json()
        
        if (userData.success) {
            socket.emit('login', user.uid)
            console.log(userData.message)
            console.log(userData.data.player1Pieces)
            dispatch(login({ email: user.email, displayName: user.displayName, photoURL: user.photoURL, playerPiece: [userData.data.player1Pieces, userData.data.player2Pieces], uiColors: userData.data.themeColors, boardColors: userData.data.boardColors }))

        } else {
            console.log(userData.message)
        }

    }

    const logoutClient = async () => {
        logout()
        dispatch(logoutUser())
    }

    useEffect(() => {
        if (user && userState.username === '') {
            loginUser()
        }
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

        <Paper sx={{ display: 'flex', justifyContent: 'space-between', mb: '20px', padding: '40px', borderRadius: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
            <NavLink onClick={newPage} style={{ textDecoration: 'none' }} to='/game'><Box sx={{ display: 'flex', alignItems: 'center'}} >
                <Box sx={{ maxHeight: '64px', maxWidth: '64px' }}
                    component="img"
                    alt="placeholder"
                    src={`${process.env.PUBLIC_URL}/imgs/Icon.png`} />
            </Box></NavLink>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {user && user.photoURL ? <NavLink onClick={newPage} style={{ textDecoration: 'none' }} to='/userpage'><Avatar sx={{ margin: '20px', maxWidth: '64px' }} src={user.photoURL} /></NavLink> : user && user.displayName ? <Avatar>{user.displayName[0]}</Avatar> : null}
                {!user ? <NavLink style={{ textDecoration: 'none' }} to='/login'><Button sx={{ margin: '20px' }} onClick={newPage} variant="contained" >Login</Button> </NavLink> : <Button sx={{ margin: '20px' }} color="warning" onClick={logoutClient} variant="contained" >Logout</Button>}
                {!user ? <NavLink style={{ textDecoration: 'none' }} to='/registration'><Button sx={{ margin: '20px' }} onClick={newPage} variant="contained" >Register</Button> </NavLink> : null}
            </Box>

        </Paper>
    )

}

export default Header;