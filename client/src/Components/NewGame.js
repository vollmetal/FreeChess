import { Button, Card, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { socket } from "..";
import { GridSetup, makeNewGamePieces, SERVER_PATH } from "../constants";
import { auth } from "../Functions/firestore";




const NewGame = () => {
    const [user, loading, error] = useAuthState(auth)

    const [newGameInfo, setNewGameInfo] = useState({gameBoard: GridSetup(9,9),  players: {
        1: {
            uid: '',
            name: '',
            pieces: 16
        }, 2: {
            uid: '',
            name: '',
            pieces: 16
     }}})
    

    const navigate = useNavigate()

    const onTextChange = (e) => {
        setNewGameInfo({
            ...newGameInfo,
            gameName: e.target.value
        })
    }

    const createGame = async () => {
        const result = await fetch(`${SERVER_PATH}/game/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGameInfo)
        })
        const sanitizedResult = await result.json()
        if(sanitizedResult.success) {
            console.log(sanitizedResult.message)
            socket.emit('newGameLobby')
            navigate('/game')
        }
    }

    return (
        <Box>
            <Card sx={{ padding: '20px' }}>
                <Box>
                    <TextField onChange={onTextChange} id="outlined-basic" helperText="Game Name" name='gameName' variant="outlined" />
                    <FormControl>
                        <FormLabel id="playerSide">Which side do you want to play?</FormLabel>
                        <RadioGroup
                            row
                            name="playerSide"
                        >
                            <FormControlLabel value="White" control={<Radio />} label="White" />
                            <FormControlLabel value="Black" control={<Radio />} label="Black" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Button onClick={createGame} variant="contained">Create Game</Button>
            </Card>
        </Box>
    )

}

export default NewGame;