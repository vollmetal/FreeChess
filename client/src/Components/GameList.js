import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { socket } from "..";
import { SERVER_PATH } from "../constants";
import { auth } from "../Functions/firestore";
import { mainTheme } from "../Themes";




const GameList = () => {

    const [user, loading, error] = useAuthState(auth)
    const [gettingInfo, setGettingInfo] = useState(true)
    const [gameList, setGameList] = useState([])
    const navigate = useNavigate()
    let roomJoined = false

    useEffect(() => {
        socket.emit('listRoomJoin')
        socket.on('listRoomJoined', function(message){
            console.log(message)
            getInfo()})
        socket.on('lobbyListUpdate', function(){getInfo()})

    }, [gettingInfo])

    

    

    const getInfo = async () => {
        
        const result = await fetch(`${SERVER_PATH}/game/findall`)
        const sanitizedResult = await result.json()
        if(sanitizedResult.success) {
            console.log(sanitizedResult)
            setGameList({
                ...gameList,
                list: sanitizedResult.gameList})
            makeListElements(sanitizedResult.gameList)
            setGettingInfo(true)
        }
    }

    const joinGame = async (gameId) => {
        const result = await fetch(`${SERVER_PATH}/game/join/${gameId}`)
        const sanitizedResult = await result.json()
        if(sanitizedResult.success) {
            socket.emit('joinRoom', {uid: user.uid, name: user.displayName, roomId: gameId})
            navigate(`/lobby/${gameId}`)
        } else {
            console.log(sanitizedResult.message)
        }
    }

    const makeListElements = (list) => {
        const listElements = list.map(game => {
            return (<Card sx={{margin: '10%', background: mainTheme.palette.primary.light}} key={`id-${game._id}`}>
                <CardContent>
                <Typography variant="h5">{game.name}</Typography>
                <Typography variant="body2">Current Players: {game.currentPlayers}</Typography> 
                
                </CardContent>
                <CardActions>
                <Button variant="contained" onClick={() => {joinGame(game._id)}}>Join Game</Button>
                </CardActions>
            </Card>)
        })
        setGameList({
            ...gameList,
            elements: listElements
        })
    }

    


    return (
        <Box>
            <NavLink to='/newGame'><Button sx={{margin: '10px'}} variant="contained"> Make New Game</Button></NavLink>

            {gameList.elements}

        </Box>
    )
}


export default GameList;