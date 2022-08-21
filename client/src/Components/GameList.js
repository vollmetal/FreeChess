import { Button, Card, CardActions, CardContent, Paper, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { socket } from "..";
import { SERVER_PATH, SERVER_PORT } from "../constants";
import { auth } from "../Functions/firestore";
import { mainTheme } from "../Themes";




const GameList = () => {

    const [user, loading, error] = useAuthState(auth)
    const [gettingInfo, setGettingInfo] = useState(true)
    const [gameRender, setGameRender] = useState(false)
    const [gameList, setGameList] = useState([])
    const navigate = useNavigate()
    let roomJoined = false

    useEffect(() => {
        socket.emit('listRoomJoin')
        socket.on('listRoomJoined', function(message){
            getInfo()})
        socket.on('lobbyListUpdate', function(){
            if(gameRender) {
                setGameRender(false)
            } else {
                setGameRender(true)
            }
            getInfo()})
        console.log(user)

    }, [gameRender])

    

    

    const getInfo = async () => {
        setGettingInfo(true)
        const result = await fetch(`${SERVER_PATH}${SERVER_PORT}/game/findall`)
        const sanitizedResult = await result.json()
        if(sanitizedResult.success) {
            setGameList({
                ...gameList,
                list: sanitizedResult.gameList})
            makeListElements(sanitizedResult.gameList)
            
        }
        setGettingInfo(false)
    }

    const joinGame = async (gameId) => {
        const result = await fetch(`${SERVER_PATH}${SERVER_PORT}/game/join/${gameId}`)
        const sanitizedResult = await result.json()
        if(sanitizedResult.success) {
            
                socket.emit('joinRoom', {roomId: gameId})
            
            navigate(`/lobby/${gameId}`)
        } else {
            console.log(sanitizedResult.message)
        }
    }

    const makeListElements = (list) => {
        const listElements = list.map(game => {
            return (<Card sx={{margin: '2%', padding: '2%'}} key={`id-${game._id}`}>
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
        <Paper sx={{display: 'flex', flexDirection: 'column'}}>
            {!user ? <Typography variant="body1">Welcome to Free Chess! Here you can join a game lobby to watch a game.</Typography>: <Typography variant="body1">Welcome to Free Chess {user.displayName}! Here you can join a game lobby to watch a game.</Typography>}
            {user ? <NavLink style={{textDecoration: 'none'}} to='/newGame'><Button sx={{margin: '10px'}} variant="contained"> Make New Game</Button></NavLink>: null}

            {gettingInfo ? <Skeleton width='100%' height='auto' variant="rounded"></Skeleton> :<Box sx={{display: 'flex', flexWrap: 'wrap'}}>{gameList.elements}</Box>}
            

        </Paper>
    )
}


export default GameList;