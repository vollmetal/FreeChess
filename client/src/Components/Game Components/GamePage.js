import { Typography } from "@mui/material"
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

        makeBoardElements()
        return () => {
            isRunning = false
        }
    }, [gameState])

    const makeBoardElements = () => {

        let grid = gameState.gamePieces
        let pieces = props.gameInfo.boardPieces
        let movesets = gameState.spaceModifiers

        if (gameState.gamePieces.length > 2) {
            pieces = gameState.gamePieces
        }

        if (gameState.gameBoard.length > 2) {
            grid = gameState.gameBoard
        }
        if (gameState.spaceModifiers.length > 0) {
            movesets = gameState.spaceModifiers
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
                            tmp = <Pawn id={index} player={piece.player} capture={piece.capture} />
                            break;
                        case 'Rook':
                            tmp = <Rook id={index} player={piece.player} capture={piece.capture} />
                            break;
                        case 'Knight':
                            tmp = <Knight id={index} player={piece.player} capture={piece.capture} />
                            break;
                        case 'Bishop':
                            tmp = <Bishop id={index} player={piece.player} capture={piece.capture} />
                            break;
                        case 'Queen':
                            tmp = <Queen id={index} player={piece.player} capture={piece.capture} />
                            break;
                        case 'King':
                            tmp = <King id={index} player={piece.player} capture={piece.capture} />
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
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '75%'}}>
            <Typography sx={{padding: '10px'}}>{gameState.name}</Typography>
            <Box sx={{borderStyle: 'solid', display: 'grid', gridTemplateRows: 'repeat(8, minmax(2px, 1fr))', gridTemplateColumns: 'repeat(8, minmax(2px, 1fr))', justifyItems: 'stretch', height: '100%', width: '100%' }}>
                {gameBoard ? gameBoard.gameBoardElements : null}

            </Box>
        </Box>
    )

}

export default GamePage