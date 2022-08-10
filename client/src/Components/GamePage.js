import { Button, Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GridSetup, makeNewGamePieces } from "../constants"
import { makePiece, setNewGame } from "../store/gameReducer"
import Bishop from "./Game Components/Bishop"
import BoardSpace from "./Game Components/BoardPiece"
import King from "./Game Components/King"
import Knight from "./Game Components/Knight"
import Pawn from "./Game Components/Pawn"
import Queen from "./Game Components/Queen"
import Rook from "./Game Components/Rook"
import ValidMove from "./Game Components/ValidMove"





const GamePage = () => {

    const gameState = useSelector(state => state.game)
    const dispatch = useDispatch()

    const [gameBoard, setGameBoard] = useState({})
    const [gameLoaded, setGameLoaded] = useState(false)

    useEffect(() => {
        let isRunning = true

        makeBoardElements()
        console.log(gameBoard)
        return () => {
            isRunning = false
        }
    }, [gameState])

    const makeBoardElements = () => {

        let grid = []
        let pieces = []
        let movesets = []
        console.log(`Game Pieces in Redux - ${gameState.gamePieces.length} || Game Board in Redux - ${gameState.gameBoard.length}`)

        if (gameState.gamePieces.length > 2) {
            pieces = gameState.gamePieces
            console.log('LOADING FROM REDUX')
        } else {
            pieces = makeNewGamePieces(9, 9)
            console.log('MAKING NEW BOARD')
        }

        if (gameState.gameBoard.length > 2) {
            grid = gameState.gameBoard
            console.log('LOADING FROM REDUX')
        } else {
            grid = GridSetup(9, 9)
            console.log('MAKING NEW BOARD')
        }
        if (gameState.spaceModifiers.length > 0) {
            movesets = gameState.spaceModifiers
            console.log(gameState.spaceModifiers)
        }
        const gameBoardElements = []

        for (let index = 0; index < grid.length; index++) {
            const element = grid[index];
            let pieceElement = ''
            let visibleElement = ''
            for (let index = 0; index < pieces.length; index++) {
                const piece = pieces[index];
                if (element.position.x == piece.position.x && element.position.y == piece.position.y) {
                    let tmp = null
                    switch (piece.piece) {
                        case 'Pawn':
                            tmp = <Pawn id={index} player={piece.player} />
                            break;
                        case 'Rook':
                            tmp = <Rook id={index} player={piece.player} />
                            break;
                        case 'Knight':
                            tmp = <Knight id={index} player={piece.player} />
                            break;
                        case 'Bishop':
                            tmp = <Bishop id={index} player={piece.player} />
                            break;
                        case 'Queen':
                            tmp = <Queen id={index} player={piece.player} />
                            break;
                        case 'King':
                            tmp = <King id={index} player={piece.player} />
                            break;

                        default:
                            break;
                    }
                    pieceElement = tmp
                }
            }
            for (let index = 0; index < movesets.length; index++) {
                const square = movesets[index];
                if (element.position.x == square.position.x && element.position.y == square.position.y) {
                    let tmp = null
                    switch (square.type) {
                        case 'Move':
                            tmp = <ValidMove type={'move'} position={{ x: element.position.x, y: square.position.y }} movePiece={square.id} />
                            break;
                        case 'Capture':
                            tmp = <ValidMove />
                            break;
                        default:
                            break;
                    }
                    visibleElement = tmp
                }
            }
            gameBoardElements.push(<Box sx={{ backgroundColor: element.color, gridColumn: element.position.x, gridRow: element.position.y }} key={`${element.position.x}-${element.position.y}`} >
                {visibleElement}
                {pieceElement}




            </Box>)

        }
        setGameBoard({
            gameBoardElements
        })
        dispatch(setNewGame({ gameBoard: grid, gamePieces: pieces }))
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
            <label>This is the Game Page</label>
            <Box sx={{ aspectRatio: '1/1', borderStyle: 'solid', display: 'grid', gridTemplateRows: 'repeat(8, 128px)', gridTemplateColumns: 'repeat(8, 128px)', justifyItems: 'stretch' }}>
                {gameBoard ? gameBoard.gameBoardElements : null}

            </Box>
        </Box>
    )

}

export default GamePage