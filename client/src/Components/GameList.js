import { Button, Card, CardActionArea, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { socket } from "..";
import { SERVER_PATH } from "../constants";
import { auth } from "../firestore";




const GameList = () => {

    const [user, loading, error] = useAuthState(auth)
    const [gettingInfo, setGettingInfo] = useState(true)
    const [gameList, setGameList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const loading = false;
        getInfo()
        

    }, [gettingInfo])

    const getInfo = async () => {
        setGettingInfo(true)
        const result = await fetch(`${SERVER_PATH}/game/findall`)
        const sanitizedResult = await result.json()
        if(sanitizedResult.success) {
            console.log(sanitizedResult)
            setGameList({
                ...gameList,
                list: sanitizedResult.gameList})
            makeListElements(sanitizedResult.gameList)
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
            return (<Box key={`id-${game._id}`}>
                <Typography>{game.name}</Typography>
                <Typography>Current Players: {game.currentPlayers}</Typography> 
                <Button onClick={() => {joinGame(game._id)}}>Join Game</Button>
            </Box>)
        })
        setGameList({
            ...gameList,
            elements: listElements
        })
    }


    return (
        <Box>
            <NavLink to='/newGame'><Button variant="contained"> Make New Game</Button></NavLink>

            <Card >
                {gameList.elements}
            </Card>

        </Box>
    )
}


export default GameList;