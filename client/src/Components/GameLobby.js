import { Button, Card, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "..";
import { SERVER_PATH } from "../constants";
import { auth } from "../Functions/firestore";
import { clearGame, setClientPlayer, setNewGame } from "../store/gameReducer";
import GamePage from "./Game Components/GamePage";




const GameLobby = () => {
    const [isPlayer, setIsPlayer] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const gameState = useSelector(state => state.game)
    const [gameInfo, setGameInfo] = useState({})
    const [user, loading, error] = useAuthState(auth)

    const { gameId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    socket.on('updateRoom', () => {
        console.log('received Room Update')
        
        if(isLoading) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    })

    socket.on('userLeft', () => {
        console.log('user has left the game')
        if(isLoading) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    })

    socket.on('userDisconnected', () => {
        console.log('user disconnected')
        if(isLoading) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    })

    socket.on('userJoin', () => {
        console.log('user has joined the game')
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
            if(user) {
                if( sanitizedResults.gameInfo.players[1].uid === user.uid) {
                    setIsPlayer(true)
                    clientPlayer = 1
                } else if (sanitizedResults.gameInfo.players[2].uid === user.uid) {
                    setIsPlayer(true)
                    clientPlayer = 2
                }
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
            
            setIsPlayer(true)
            dispatch(setClientPlayer(player))
            
        } else {
            
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

    const leavePage = () => {
        const data = { roomId: gameState.id, gameId: gameState.id, playerSide: gameState.clientPlayer }
        if (gameState.gameId != '' && gameState.clientPlayer > 0) {
            socket.emit('leaveRooms', data)
        } else {
            socket.emit('leaveRooms', { roomId: gameState.gameId })
        }
        dispatch((clearGame()))
        navigate('/')
    }

    return (
        <Box sx={{padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
            <Button sx={{}} onClick={leavePage} variant='contained'>Return to game list</Button>

            <Card sx={{margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {!user ? <Typography>Please log in to join the game</Typography>: <Box>
                {isPlayer ? <Box>{ gameInfo.clientPlayer === gameInfo.playerTurn ? <Typography >It is your turn!</Typography>: <Typography >It is the other players turn!</Typography> } </Box>:
                  <Box sx={{width: '100%', display: 'flex'}}>
                    
                    {gameInfo.players ? <Button sx={{margin: '20px'}} disabled={(gameInfo.players[1].uid !== '')} onClick={()=> {joinAsPlayer(1)}} variant="contained">Join as Player 1</Button>: <Skeleton></Skeleton>}
                    {gameInfo.players ? <Button sx={{margin: '20px'}} disabled={(gameInfo.players[2].uid !== '')} onClick={()=> {joinAsPlayer(2)}} variant="contained">Join as Player 2</Button>: <Skeleton></Skeleton>}
                    </Box>}</Box>}
            </Card>
            <Card sx={{padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <GamePage />
            </Card>
        </Box>
    )

}

export default GameLobby;