import { Button, Card, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { socket } from "..";
import { GridSetup, SERVER_PATH } from "../constants";
import { auth } from "../Functions/firestore";
import { clearGame, setClientPlayer, setNewGame } from "../store/gameReducer";
import { mainTheme } from "../Themes";
import GamePage from "./Game Components/GamePage";




const GameLobby = () => {
    const [isPlayer, setIsPlayer] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [gameInfo, setGameInfo] = useState({})
    const [user, loading, error] = useAuthState(auth)

    const { gameId } = useParams()
    const dispatch = useDispatch()

    
    socket.on('updateRoom', () => {
        console.log('received Room Update')
        
        if(isLoading) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    })

    

    

    const fetchGameInfo = async () => {
        const results = await fetch(`${SERVER_PATH}/game/loadGame/${gameId}`)
        const sanitizedResults = await results.json()
        if(sanitizedResults.success) {
            let players = []
            let clientPlayer = -1
            if( sanitizedResults.gameInfo.players[1].uid === user.uid) {
                setIsPlayer(true)
                clientPlayer = 1
            } else if (sanitizedResults.gameInfo.players[2].uid === user.uid) {
                setIsPlayer(true)
                clientPlayer = 2
            }
            
            dispatch(clearGame())
            dispatch(setNewGame({ gameBoard: sanitizedResults.gameInfo.gameBoard, players: sanitizedResults.gameInfo.players, clientPlayer: clientPlayer, turn: sanitizedResults.gameInfo.playerTurn, id: sanitizedResults.gameInfo._id, name: sanitizedResults.gameInfo.name}))
            setGameInfo(sanitizedResults.gameInfo)
        } else {

        }
    }


    const joinAsPlayer = async (player) => {
        const data = {
            uid: user.uid,
            name: user.displayName,
            side: player
        }

        const result = await fetch(`${SERVER_PATH}/game/lobby/joinSide/${gameId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)})
        const sanitizedResults = await result.json()
        if(sanitizedResults.success) {
            console.log(sanitizedResults.message)
            setIsPlayer(true)
            dispatch(setClientPlayer(player))
            
        } else {
            console.log(sanitizedResults.message)
        }
    }

    useEffect(() => {
        console.log('room rendering')
        let isRunning = true
        fetchGameInfo()
        return () => {
            isRunning = false
        }

    }, [user, isLoading])

    return (
        <Box sx={{padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Card sx={{margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {isPlayer ? <Box>

                </Box>: <Box sx={{width: '100%', display: 'flex'}}>
                    {gameInfo.players ? <Button sx={{margin: '20px'}} disabled={(gameInfo.players[1].uid !== '')} onClick={()=> {joinAsPlayer(1)}} variant="contained">Join as Player 1</Button>: <Skeleton></Skeleton>}
                    {gameInfo.players ? <Button sx={{margin: '20px'}} disabled={(gameInfo.players[2].uid !== '')} onClick={()=> {joinAsPlayer(2)}} variant="contained">Join as Player 2</Button>: <Skeleton></Skeleton>}
                    </Box>}
            </Card>
            <Card sx={{padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: mainTheme.palette.primary.light}}>
                <GamePage />
            </Card>
        </Box>
    )

}

export default GameLobby;