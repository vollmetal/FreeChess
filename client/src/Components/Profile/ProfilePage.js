import { Button, Card, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useDispatch, useSelector } from "react-redux"
import { imagePath, piecePath, SERVER_PATH } from "../../constants"
import { auth } from "../../Functions/firestore"
import { login } from "../../store/userReducer"



const ProfilePage = () => {
    const userState = useSelector(state => state.user)
    const [user, loading, error] = useAuthState(auth)

    const dispatch = useDispatch()

    const [tempChanges, setTempChanges] = useState({ player1Piece: userState.playerPiece[0], player2Piece: userState.playerPiece[1], boardColors1: userState.boardColors[0], boardColors2: userState.boardColors[1], theme: userState.uiColors })

    const selectPlayerPiece = (e) => {
        setTempChanges({
            ...tempChanges,
            [e.target.name]: e.target.value
        })
    }

    const selectBoardColors = (e) => {
        setTempChanges({
            ...tempChanges,
            [e.target.name]: e.target.value
        })
    }

    const saveChanges = async () => {
        const result = await fetch(`${SERVER_PATH}/user/update/${user.uid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pieces: [tempChanges.player1Piece, tempChanges.player2Piece], boardColors: [tempChanges.boardColors1, tempChanges.boardColors2], theme: tempChanges.theme })
        })
        const sanitizedResult = await result.json()
        const result2 = await fetch(`${SERVER_PATH}/user/getuser/${user.uid}`)
        const userData = await result2.json()
        if (userData.success) {
            dispatch(login({ email: user.email, displayName: user.displayName, photoURL: user.photoURL, playerPiece: [userData.data.player1Pieces, userData.data.player2Pieces], uiColors: userData.data.themeColors, boardColors: userData.data.boardColors }))

        } else {

        }
    }


    return (<Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography margin='5%' variant="h4">Customize your preferences</Typography>
        <Box margin='5%' sx={{ borderStyle: 'solid', borderTopWidth: '4px', borderBottomWidth: '4px', borderLeftWidth: '0px', borderRightWidth: '0px' }}>
            <FormControl>
                <FormLabel>Player 1 Piece Color</FormLabel>
                <RadioGroup
                    onChange={selectPlayerPiece}
                    row
                    sx={{ margin: '20px' }}
                    defaultValue={userState.playerPiece[0]}
                >
                    <FormControlLabel name="player1Piece" value="White" control={<Radio />} label="White" />
                    <FormControlLabel name="player1Piece" value='Black' control={<Radio />} label='Black' />
                    <FormControlLabel name="player1Piece" value="DarkGrey" control={<Radio />} label="Dark Grey" />
                    <FormControlLabel name="player1Piece" value="LightGrey" control={<Radio />} label="Light Grey" />
                    <FormControlLabel name="player1Piece" value="Green" control={<Radio />} label="Green" />
                    <FormControlLabel name="player1Piece" value='Orange' control={<Radio />} label='Orange' />
                    <FormControlLabel name="player1Piece" value="Pink" control={<Radio />} label="Pink" />
                    <FormControlLabel name="player1Piece" value="Red" control={<Radio />} label="Red" />
                    <FormControlLabel name="player1Piece" value="Yellow" control={<Radio />} label="Yellow" />
                    <FormControlLabel name="player1Piece" value="Blue" control={<Radio />} label="Blue" />

                </RadioGroup>
            </FormControl>
            <Box maxWidth='128px' sx={{ height: 'auto', padding: '20px' }}><Box sx={{ height: '100%', width: '100%' }}
                component="img"
                alt="placeholder"
                src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${tempChanges.player1Piece}/Pawn.png`} /></Box>
            <FormControl>
                <FormLabel>Player 2 Piece Color</FormLabel>
                <RadioGroup
                    onChange={selectPlayerPiece}
                    row
                    sx={{ margin: '20px' }}
                    defaultValue={userState.playerPiece[1]}
                >
                    <FormControlLabel name="player2Piece" value="White" control={<Radio />} label="White" />
                    <FormControlLabel name="player2Piece" value='Black' control={<Radio />} label='Black' />
                    <FormControlLabel name="player2Piece" value="DarkGrey" control={<Radio />} label="Dark Grey" />
                    <FormControlLabel name="player2Piece" value="LightGrey" control={<Radio />} label="Light Grey" />
                    <FormControlLabel name="player2Piece" value="Green" control={<Radio />} label="Green" />
                    <FormControlLabel name="player2Piece" value='Orange' control={<Radio />} label='Orange' />
                    <FormControlLabel name="player2Piece" value="Pink" control={<Radio />} label="Pink" />
                    <FormControlLabel name="player2Piece" value="Red" control={<Radio />} label="Red" />
                    <FormControlLabel name="player2Piece" value="Yellow" control={<Radio />} label="Yellow" />
                    <FormControlLabel name="player2Piece" value="Blue" control={<Radio />} label="Blue" />
                </RadioGroup>
            </FormControl>
            <Box maxWidth='128px' sx={{ height: 'auto', padding: '20px' }}><Box sx={{ height: '100%', width: '100%' }}
                component="img"
                alt="placeholder"
                src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${tempChanges.player2Piece}/Pawn.png`} /></Box>
        </Box>
        <Box margin='5%' sx={{ borderStyle: 'solid', borderTopWidth: '0px', borderBottomWidth: '4px', borderLeftWidth: '0px', borderRightWidth: '0px' }}>
            <FormControl>
                <FormLabel>Board Color Set Square 1</FormLabel>
                <RadioGroup
                    onChange={selectBoardColors}
                    row
                    sx={{ margin: '20px' }}
                    defaultValue={userState.boardColors[0]}
                >
                    <FormControlLabel name="boardColors1" value="white" control={<Radio />} label="White" />
                    <FormControlLabel name="boardColors1" value='black' control={<Radio />} label='Black' />
                    <FormControlLabel name="boardColors1" value="blue" control={<Radio />} label="Blue" />
                    <FormControlLabel name="boardColors1" value="red" control={<Radio />} label="Red" />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <FormLabel>Board Color Set Square 2</FormLabel>
                <RadioGroup
                    onChange={selectBoardColors}
                    row
                    sx={{ margin: '20px' }}
                    defaultValue={userState.boardColors[1]}
                >
                    <FormControlLabel name="boardColors2" value="white" control={<Radio />} label="White" />
                    <FormControlLabel name="boardColors2" value='black' control={<Radio />} label='Black' />
                    <FormControlLabel name="boardColors2" value="blue" control={<Radio />} label="Blue" />
                    <FormControlLabel name="boardColors2" value="red" control={<Radio />} label="Red" />
                </RadioGroup>
            </FormControl>
            <Box display='flex' flexDirection='row' justifyContent='center'>
                <Box maxWidth='128px' sx={{ backgroundColor: tempChanges.boardColors1, aspectRatio: '1/ 1' }}>
                    <Box sx={{ height: '100%', width: '100%' }}
                        component="img"
                        alt="placeholder"
                        src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${tempChanges.player2Piece}/Pawn.png`} />
                </Box>
                <Box maxWidth='128px' sx={{ backgroundColor: tempChanges.boardColors2, aspectRatio: '1/ 1' }}>
                    <Box sx={{ height: '100%', width: '100%' }}
                        component="img"
                        alt="placeholder"
                        src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${tempChanges.player2Piece}/Pawn.png`} />
                </Box>
            </Box>

        </Box>
        <Box margin='5%' sx={{ borderStyle: 'solid', borderTopWidth: '0px', borderBottomWidth: '4px', borderLeftWidth: '0px', borderRightWidth: '0px' }}>
            <FormControl>
                <FormLabel>Theme</FormLabel>
                <RadioGroup
                    onChange={selectBoardColors}
                    row
                    sx={{ margin: '20px' }}
                    defaultValue={userState.uiColors}
                >
                    <FormControlLabel name="theme" value="Basic" control={<Radio />} label="Light Mode" />
                    <FormControlLabel name="theme" value='darkTheme' control={<Radio />} label='Dark Mode' />
                </RadioGroup>
            </FormControl>
        </Box>

        <Button sx={{ width: '100%', margin: '20px' }} onClick={saveChanges} variant='contained'>Save Changes</Button>

    </Card>)
}

export default ProfilePage;