import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useDispatch, useSelector } from "react-redux"
import { auth } from "../../Functions/firestore"
import Bishop from "./Pieces/Bishop"
import King from "./Pieces/King"
import Knight from "./Pieces/Knight"
import Pawn from "./Pieces/Pawn"
import Queen from "./Pieces/Queen"
import Rook from "./Pieces/Rook"
import ValidMove from "./ValidMove"





const GamePage = (props) => {

    const [user, loading, error] = useAuthState(auth)

    const gameState = useSelector(state => state.game)
    const dispatch = useDispatch()

    const [gameBoard, setGameBoard] = useState({})
    const [gameLoaded, setGameLoaded] = useState(false)

    useEffect(() => {
        let isRunning = true

        if(gameState.gameBoard.length > 1) {
            makeBoardElements()
        }
        
        return () => {
            isRunning = false
        }
    }, [])

    const makeBoardElements = () => {

        let grid = gameState.gameBoard

        let gameBoardElements = []

        for (let index = 0; index < grid.length; index++) {
            const element = grid[index];
            gameBoardElements.push(<Box sx={{ backgroundColor: element.color, gridColumn: element.position.x, gridRow: element.position.y }} key={`${index}`} >

                {element.move == 'selectPiece' ? <Button>{element.piece == 'Pawn' ? <Pawn id={index} player={element.player} /> :
                    element.piece == 'Rook' ? <Rook id={index} player={element.player} /> :
                        element.piece == 'Bishop' ? <Bishop id={index} player={element.player} /> :
                            element.piece == 'Knight' ? <Knight id={index} player={element.player} /> :
                                element.piece == 'Queen' ? <Queen id={index} player={element.player} /> :
                                    element.piece == 'King' ? <King id={index} player={element.player} /> : null}
                </Button> :
                    element.move == 'moveSpace' ? <Button /> :
                        element.move == 'capturePiece' ? <Button>{element.piece == 'Pawn' ? <Pawn id={index} player={element.player} /> :
                            element.piece == 'Rook' ? <Rook id={index} player={element.player} /> :
                                element.piece == 'Bishop' ? <Bishop id={index} player={element.player} /> :
                                    element.piece == 'Knight' ? <Knight id={index} player={element.player} /> :
                                        element.piece == 'Queen' ? <Queen id={index} player={element.player} /> :
                                            element.piece == 'King' ? <King id={index} player={element.player} /> : null}</Button>
                            : <Box>{element.piece == 'Pawn' ? <Pawn id={index} player={element.player} /> :
                            element.piece == 'Rook' ? <Rook id={index} player={element.player} /> :
                                element.piece == 'Bishop' ? <Bishop id={index} player={element.player} /> :
                                    element.piece == 'Knight' ? <Knight id={index} player={element.player} /> :
                                        element.piece == 'Queen' ? <Queen id={index} player={element.player} /> :
                                            element.piece == 'King' ? <King id={index} player={element.player} /> : null}</Box>}




            </Box>)

        }
        setGameBoard({
            gameBoardElements
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '75%' }}>
            <Typography sx={{ padding: '10px' }}>{gameState.name}</Typography>
            <Box sx={{ borderStyle: 'solid', display: 'grid', gridTemplateRows: 'repeat(8, minmax(2px, 1fr))', gridTemplateColumns: 'repeat(8, minmax(2px, 1fr))', justifyItems: 'stretch', height: '100%', width: '100%' }}>
                {gameBoard ? gameBoard.gameBoardElements : null}

            </Box>
        </Box>
    )

}

export default GamePage