import { useTheme } from "@emotion/react";
import { Button, Card, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { socket } from "..";
import { GridSetup, SERVER_PATH, SERVER_PORT } from "../constants";
import { auth } from "../Functions/firestore";




const NewGame = () => {
    const [user, loading, error] = useAuthState(auth)

    const theme = useTheme()

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
        const result = await fetch(`${SERVER_PATH}${SERVER_PORT}/game/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGameInfo)
        })
        const sanitizedResult = await result.json()
        if(sanitizedResult.success) {
            console.log(sanitizedResult)
            socket.emit('newGameLobby')
            socket.emit('joinRoom', {roomId: sanitizedResult.game._id})
            navigate(`/lobby/${sanitizedResult.game._id}`)
        }
    }

    return (
            <Card sx={{display: 'flex', flexDirection: 'column',  padding: '20px', margin: '4%' }}>
                <Typography textAlign='center' variant='h4'>Make a New Game</Typography>
                <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        name="gameName"
                        onChange={onTextChange}
                    />
                <Button onClick={createGame} variant="contained">Create Game</Button>
            </Card>
    )

}

export default NewGame;