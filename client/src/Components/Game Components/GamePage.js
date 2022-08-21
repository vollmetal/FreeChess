import { Button, Card, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { socket } from "../.."
import { SERVER_PATH, SERVER_PORT } from "../../constants"
import { auth } from "../../Functions/firestore"
import { clearGame, finishRender, moveCancel, moveFinish, moveStart } from "../../store/gameReducer"
import Bishop from "./Pieces/Bishop"
import King from "./Pieces/King"
import Knight from "./Pieces/Knight"
import Pawn from "./Pieces/Pawn"
import Queen from "./Pieces/Queen"
import Rook from "./Pieces/Rook"





const GamePage = (props) => {

    const [user, loading, error] = useAuthState(auth)

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [gameBoard, setGameBoard] = useState({})
    const [gameLoaded, setGameLoaded] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (gameState.gameBoard) {
            if (gameState.gameBoard.length > 1) {
                makeBoardElements()
                dispatch(finishRender())
            }
        }
    }, [gameState.render, gameState.gameBoard])

    const startMove = async (spaceId) => {
        dispatch(moveStart(spaceId))

    }

    

    const moveSpace = async (spaceId, movePieceId, movePiece) => {
        let newGameBoard = gameState.gameBoard.map(space => { return { position: space.position, color: space.color, piece: space.piece, player: space.player, move: space.move } })
        newGameBoard[spaceId].piece = movePiece
        newGameBoard[spaceId].player = gameState.clientPlayer

        newGameBoard[movePieceId].piece = ''
        newGameBoard[movePieceId].player = 0
        newGameBoard = newGameBoard.map(space => {
            return { position: space.position, piece: space.piece, move: '', player: space.player, color: space.color }
        })
        dispatch(moveFinish({ spaceId: spaceId, movePieceId: movePieceId, movePiece: movePiece }))
        const result = await fetch(`${SERVER_PATH}${SERVER_PORT}/game/move/${gameState.id}`, {
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
            gameBoardElements.push(<Box sx={{ backgroundColor: userState.boardColors[element.color], gridColumn: element.position.x + 1, gridRow: element.position.y, aspectRatio: '1/ 1' }} key={`${index}`} >

                {element.move == 'selectPiece' && gameState.playerTurn === gameState.clientPlayer ? <Button onClick={() => { startMove(index) }} sx={{ minWidth: '0px', width: '100%', height: '100%', padding: '0px', borderStyle: 'solid', borderWidth: '3px', borderColor: 'gray' }}>{element.piece == 'Pawn' ? <Pawn id={index} player={element.player} /> :
                    element.piece == 'Rook' ? <Rook id={index} player={element.player} /> :
                        element.piece == 'Bishop' ? <Bishop id={index} player={element.player} /> :
                            element.piece == 'Knight' ? <Knight id={index} player={element.player} /> :
                                element.piece == 'Queen' ? <Queen id={index} player={element.player} /> :
                                    element.piece == 'King' ? <King id={index} player={element.player} /> : null}
                </Button> :
                    element.move == 'move' ? <Button onClick={() => { moveSpace(index, element.pieceIndex, gameState.gameBoard[element.pieceIndex].piece) }} sx={{ minWidth: '0px', width: '100%', height: '100%', padding: '0px', borderStyle: 'solid', borderWidth: '3px', borderColor: 'green' }} /> :
                        element.move == 'capture' ? <Button onClick={() => { moveSpace(index, element.pieceIndex, gameState.gameBoard[element.pieceIndex].piece) }} sx={{ width: '100%', height: '100%', padding: '0px', borderStyle: 'solid', borderWidth: '3px', borderColor: 'red' }}>{element.piece == 'Pawn' ? <Pawn id={index} player={element.player} /> :
                            element.piece == 'Rook' ? <Rook id={index} player={element.player} /> :
                                element.piece == 'Bishop' ? <Bishop id={index} player={element.player} /> :
                                    element.piece == 'Knight' ? <Knight id={index} player={element.player} /> :
                                        element.piece == 'Queen' ? <Queen id={index} player={element.player} /> :
                                            element.piece == 'King' ? <King id={index} player={element.player} /> : null}</Button>
                            : <Box sx={{ width: '100%', height: '100%', padding: '0px' }}>{element.piece == 'Pawn' ? <Pawn id={index} player={element.player} /> :
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '5px' }}>
            

            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '5px', marginBottom: '20px' }}>
                <Typography sx={{ padding: '10px' }}>{gameState.name}</Typography>
                {gameState.players[1].uid === '' ? <Typography>Player 1 is empty</Typography> : <Typography>Player 1: {gameState.players[1].name} {gameState.playerTurn === 1 ? 'Current Turn' : ''}</Typography>}
                {gameState.players[2].uid === '' ? <Typography>Player 2 is empty</Typography> : <Typography>Player 2: {gameState.players[2].name} {gameState.playerTurn === 2 ? 'Current Turn' : ''}</Typography>}
            </Card>

            <Box sx={{ borderStyle: 'solid',borderWidth: '5px', borderColor: 'black', display: 'grid', gridTemplateRows: 'repeat(9, minmax(0px, 1fr))', gridTemplateColumns: 'repeat(9, minmax(0px, 1fr))', justifyItems: 'stretch', height: '100%', width: '100%' }}>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 0,
                    gridRow: 0,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 0,
                    gridRow: 1,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignContent: 'space-around',
                    alignItems: 'center'
                }} variant='body1'>1</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 0,
                    gridRow: 2,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignContent: 'space-around',
                    alignItems: 'center'
                }} >2</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 0,
                    gridRow: 3,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignContent: 'space-around',
                    alignItems: 'center'
                }} >3</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                     borderStyle: 'solid',
                     borderColor: 'black',
                    gridColumn: 0,
                    gridRow: 4,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignContent: 'space-around',
                    alignItems: 'center'
                }} >4</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 0,
                    gridRow: 5,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignContent: 'space-around',
                    alignItems: 'center'
                }} >5</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 0,
                    gridRow: 6,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignContent: 'space-around',
                    alignItems: 'center'
                }} >6</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 0,
                    gridRow: 7,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignContent: 'space-around',
                    alignItems: 'center'
                }} >7</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 0,
                    gridRow: 8,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignContent: 'space-around',
                    alignItems: 'center'
                }} >8</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 2,
                    gridRow: 0,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{ width: '100%', height: '100%', textAlign: 'center' }} >A</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 3,
                    gridRow: 0,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{ width: '100%', height: '100%', textAlign: 'center' }} >B</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 4,
                     gridRow: 0,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{ width: '100%', height: '100%', textAlign: 'center' }} >C</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 5,
                    gridRow: 0,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{ width: '100%', height: '100%', textAlign: 'center' }} >D</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 6,
                    gridRow: 0,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{ width: '100%', height: '100%', textAlign: 'center' }} >E</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 7,
                    gridRow: 0,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{ width: '100%', height: '100%', textAlign: 'center' }} >F</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 8,
                    gridRow: 0,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{ width: '100%', height: '100%', textAlign: 'center' }} >G</Typography></Box>
                <Box sx={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                    gridColumn: 9,
                    gridRow: 0,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/ 1'
                }}><Typography sx={{ width: '100%', height: '100%', textAlign: 'center' }} >H</Typography></Box>
                {gameBoard ? gameBoard.gameBoardElements : null}

            </Box>
        </Box>
    )

}

export default GamePage