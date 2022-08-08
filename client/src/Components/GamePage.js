import { Button, Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GridSetup } from "../constants"
import { makePiece, setNewGame } from "../store/gameReducer"
import BoardSpace from "./Game Components/BoardPiece"
import Pawn from "./Game Components/Pawn"





const GamePage = () => {

    const gameState = useSelector(state => state.game)
    const dispatch = useDispatch()

    const [gameBoard, setGameBoard] = useState([])
    const [gameLoaded, setGameLoaded] = useState(false)

    useEffect( ()=> {
        const newGrid = GridSetup(8, 8)
        dispatch(setNewGame(newGrid))
        console.log(newGrid)
        //createNewBoard()
        
    },[gameLoaded])

    const createNewBoard = async () => {
        if (gameLoaded == false) {
            
            console.log(gameState)
        gameState.gamespace.map((position, index )=> {
            console.log(position.x)
            if(position.x === 6) {
                const piece = '<Pawn position={{X: position.x, y: position.y}}/>'
                dispatch(makePiece({position: index, piece: piece}))
            }
        })
        }
        setGameLoaded(true)
    }

    const boardSpaces = () => {
        const board = []
        for (let index = 0; index < gameState.gamespace.length; index++) {
            const element = gameState.gamespace[index];
            board.push(<Grid item xs={4} sm={8} md={12} key={`${gameState.gamespace[index].x}-${gameState.gamespace[index].y}`}>
                <BoardSpace/>
            </Grid>)
        }

        return board
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
            <label>This is the Game Page</label>
            <Grid container sx={{aspectRatio: '1/1', borderStyle: 'solid'}} columns={8}
             spacing={0}>
                {Array.from(gameState.gamespace.map((item, index) => {
                    return <Grid item sx={{backgroundColor: gameState.gamespace[index].color}} xs={1}key={`${gameState.gamespace[index].x}-${gameState.gamespace[index].y}`}>
                    <BoardSpace spaceCoordinates={gameState.gamespace[index]} piece={gameState.gamespace[index].piece}/>
                </Grid>
                }))}
            </Grid>
        </Box>
    )

}

export default GamePage