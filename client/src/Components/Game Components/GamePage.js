import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useDispatch, useSelector } from "react-redux"
import { SERVER_PATH } from "../../constants"
import { auth } from "../../Functions/firestore"
import { finishRender, moveCancel, moveFinish, moveStart } from "../../store/gameReducer"
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
            if(gameState.gameBoard) {
                if(gameState.gameBoard.length > 1) {
                    makeBoardElements()
                    dispatch(finishRender())
                }
            }
    }, [gameState.render, gameState.gameBoard])

    const startMove = async (spaceId) => {
        dispatch(moveStart(spaceId))
        
    }

    const moveSpace = async (spaceId, movePieceId, movePiece) => {
        let newGameBoard = gameState.gameBoard.map(space => {return {position: space.position, color: space.color, piece: space.piece, player: space.player, move: space.move}})
        newGameBoard[spaceId].piece = movePiece
        newGameBoard[spaceId].player = gameState.clientPlayer

        newGameBoard[movePieceId].piece = ''
        newGameBoard[movePieceId].player = 0
        newGameBoard = newGameBoard.map(space => {
            return {position: space.position, piece: space.piece, move: '', player: space.player, color: space.color}
        })
        dispatch(moveFinish({spaceId: spaceId, movePieceId: movePieceId, movePiece: movePiece}))
        const result = await fetch(`${SERVER_PATH}/game/move/${gameState.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGameBoard)
        })
        const sanitizedResults = await result.json()
        console.log(sanitizedResults)
    }

    const makeBoardElements = () => {

        let grid = gameState.gameBoard

        let gameBoardElements = []

        for (let index = 0; index < grid.length; index++) {
            const element = grid[index];
            gameBoardElements.push(<Box sx={{ backgroundColor: element.color, gridColumn: element.position.x, gridRow: element.position.y }} key={`${index}`} >

                {element.move == 'selectPiece' && gameState.playerTurn === gameState.clientPlayer ? <Button onClick={() => {startMove(index)}} sx={{width: '100%', height: '100%', padding: '0px', borderStyle: 'solid', borderWidth: '3px', borderColor: 'gray'}}>{element.piece == 'Pawn' ? <Pawn id={index} player={element.player} /> :
                    element.piece == 'Rook' ? <Rook id={index} player={element.player} /> :
                        element.piece == 'Bishop' ? <Bishop id={index} player={element.player} /> :
                            element.piece == 'Knight' ? <Knight id={index} player={element.player} /> :
                                element.piece == 'Queen' ? <Queen id={index} player={element.player} /> :
                                    element.piece == 'King' ? <King id={index} player={element.player} /> : null}
                </Button> :
                    element.move == 'move' ? <Button onClick={() => {moveSpace(index, element.pieceIndex, gameState.gameBoard[element.pieceIndex].piece)}} sx={{width: '100%', height: '100%', padding: '0px', borderStyle: 'solid', borderWidth: '3px', borderColor: 'green'}} /> :
                        element.move == 'capture' ? <Button onClick={() => {moveSpace(index, element.pieceIndex, gameState.gameBoard[element.pieceIndex].piece)}} sx={{width: '100%', height: '100%', padding: '0px', borderStyle: 'solid', borderWidth: '3px', borderColor: 'red'}}>{element.piece == 'Pawn' ? <Pawn id={index} player={element.player} /> :
                            element.piece == 'Rook' ? <Rook id={index} player={element.player} /> :
                                element.piece == 'Bishop' ? <Bishop id={index} player={element.player} /> :
                                    element.piece == 'Knight' ? <Knight id={index} player={element.player} /> :
                                        element.piece == 'Queen' ? <Queen id={index} player={element.player} /> :
                                            element.piece == 'King' ? <King id={index} player={element.player} /> : null}</Button>
                            : <Box sx={{width: '100%', height: '100%', padding: '0px'}}>{element.piece == 'Pawn' ? <Pawn id={index} player={element.player} /> :
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
            <Typography sx={{ padding: '10px' }}>PLayer {gameState.playerTurn}'s turn</Typography>
            <Box sx={{ borderStyle: 'solid', display: 'grid', gridTemplateRows: 'repeat(8, minmax(2px, 1fr))', gridTemplateColumns: 'repeat(8, minmax(2px, 1fr))', justifyItems: 'stretch', height: '100%', width: '100%' }}>
                {gameBoard ? gameBoard.gameBoardElements : null}

            </Box>
        </Box>
    )

}

export default GamePage