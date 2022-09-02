import { Avatar, Box, Button, ButtonGroup, Fade, List, Paper, Popper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom'
import { socket } from "..";
import { SERVER_PATH } from "../constants";
import { auth, logout } from "../Functions/firestore";
import { clearGame } from "../store/gameReducer";
import { login, logoutUser } from "../store/userReducer";




const Header = () => {
    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)
    const [user, loading, error] = useAuthState(auth)

    const [anchorRef, setAnchorRef] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [itemOpen, setItemOpen] = useState(false)

    socket.on('connect', (arg) => {
        console.log('connected!')
    })

    const loginUser = async () => {
        const result = await fetch(`${SERVER_PATH}/user/getuser/${user.uid}`)
        const userData = await result.json()

        if (userData.success) {
            socket.emit('login', user.uid)
            dispatch(login({ email: user.email, displayName: user.displayName, photoURL: user.photoURL, playerPiece: [userData.data.player1Pieces, userData.data.player2Pieces], uiColors: userData.data.themeColors, boardColors: userData.data.boardColors }))

        } else {
            console.log(userData.message)
        }

    }
    const goToPage = (page) => {
        const data = { roomId: gameState.id, gameId: gameState.id, playerSide: gameState.clientPlayer }
        if (gameState.gameId != '' && gameState.clientPlayer > 0) {
            socket.emit('leaveRooms', data)
        } else {
            socket.emit('leaveRooms', { roomId: gameState.gameId })
        }
        dispatch(clearGame())
        switch (page) {
            case 'profile':
                setItemOpen(false)
                navigate('/userpage')
                break;
            case 'registration':
                setItemOpen(false)
                navigate('/registration')
                break;
            case 'login':
                setItemOpen(false)
                navigate('/login')
                break;
            case 'logout':
                setItemOpen(false)
                logout()
                dispatch(logoutUser())
                navigate('/')
            case 'main':
                navigate('/')
                break;
            default:
                break;
        }
    }

    const toggleState = (e) => {
        setItemOpen(!itemOpen)
        setAnchorRef(e.currentTarget)
    }

    useEffect(() => {
        if (user && userState.username === '') {
            loginUser()
        }
    }, [user])

    return (

        <Paper sx={{ display: 'flex', justifyContent: 'space-between', mb: '20px', padding: '40px', borderRadius: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} >
                <Button onClick={() => {goToPage('main')}}><Box sx={{ maxHeight: '64px', maxWidth: '64px' }}
                    component="img"
                    alt="placeholder"
                    src={`${process.env.PUBLIC_URL}/imgs/Icon.png`} />
                </Button></Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>

                <ButtonGroup padding='0px'>
                    <Button onClick={toggleState} >
                        {user && user.photoURL ? <Avatar sx={{ margin: '20px', maxWidth: '64px' }} src={user.photoURL} /> : user && user.displayName ? <Avatar>{user.displayName[0]}</Avatar> : <Avatar>G</Avatar>}
                    </Button>
                    <Popper
                        open={itemOpen}
                        sx={{
                            zIndex: 1,


                        }}
                        anchorEl={anchorRef}
                        placement='bottom'
                        transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    {!user ? <Button onClick={() => { goToPage('registration') }} >Register</Button> : <Button onClick={() => { goToPage('profile') }}>Profile</Button>}
                                    {!user ? <Button onClick={() => { goToPage('login') }} >Login</Button> : <Button onClick={() => { goToPage('logout') }} >Logout</Button>}
                                </Paper>
                            </Fade>
                        )}


                    </Popper>


                </ButtonGroup>



            </Box>

        </Paper>
    )

}

export default Header;