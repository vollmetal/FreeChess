import { Button, Card, CardActionArea, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SERVER_PATH } from "../constants";




const GameList = () => {

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
            navigate(`/lobby/${gameId}`)
        } else {
            console.log(sanitizedResult.message)
        }
    }

    const makeListElements = (list) => {
        const listElements = list.map(game => {
            return (<Box key={`id-${game._id}`}>
                <Typography>{game.name}</Typography>
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