import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getSquareIndexFromCoords } from "../../../boardManagement"
import { imagePath, piecePath, SERVER_PATH } from "../../../constants"
import movePosition from "../../../Game Functions/MovePosition"
import { moveCancel, moveFinish, moveStart, selectPiece } from "../../../store/gameReducer"




const Pawn = (props) => {

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()

    const movePiece = () => {
        let moveSpaces = []
        let captureSpaces = gameState.gamePieces.map(piece => {
            return piece
        })
        let tempSpace = {}
        let spaceX = 0
        let spaceY = 1

        if (gameState.gameState == 'clientMoving') {
            dispatch(moveCancel())
        }
        while (spaceY <= 2) {
            if (props.player == 1) {
                if (gameState.gamePieces[props.id].position.y == 2) {
                    tempSpace = movePosition(gameState.gamePieces[props.id].position.x, (spaceY + gameState.gamePieces[props.id].position.y), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
                    if (tempSpace.catch) {
                        break;
                    } else {
                        if (tempSpace.space) {
                            console.log(tempSpace)
                            moveSpaces.push(tempSpace.space)
                        }

                    }
                } else {
                    tempSpace = movePosition(gameState.gamePieces[props.id].position.x, (1 + gameState.gamePieces[props.id].position.y), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
                    if (tempSpace.catch) {
                        break;
                    } else {
                        if (tempSpace.space) {
                            console.log(tempSpace)
                            moveSpaces.push(tempSpace.space)
                        }

                    }
                }

            } else {
                if (gameState.gamePieces[props.id].position.y == 7) {
                    tempSpace = movePosition(gameState.gamePieces[props.id].position.x, (gameState.gamePieces[props.id].position.y - spaceY), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
                    if (tempSpace.catch) {
                        break;
                    } else {
                        if (tempSpace.space) {
                            moveSpaces.push(tempSpace.space)
                        }
                    }
                } else {
                    tempSpace = movePosition(gameState.gamePieces[props.id].position.x, (gameState.gamePieces[props.id].position.y - 1), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
                    if (tempSpace.catch) {
                        break;
                    } else {
                        if (tempSpace.space) {
                            moveSpaces.push(tempSpace.space)
                        }
                    }
                }

            }

            spaceY++
        }

        ////////////////////CAPTURE SPACES////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////


        if (props.player == 1) {
            let targetPosition = { x: (1 + gameState.gamePieces[props.id].position.x), y: (1 + gameState.gamePieces[props.id].position.y) }
            let targetSpace = getSquareIndexFromCoords(targetPosition, gameState.gameBoard)
            let targetPiece = getSquareIndexFromCoords(targetPosition, gameState.gamePieces)
            console.log(`Target Space - ${targetSpace} || Target Piece - ${targetPiece} || Piece Position x - ${gameState.gamePieces[props.id].position.x} || Piece Position y - ${gameState.gamePieces[props.id].position.y}`)
            if (targetSpace != -1) {
                if (targetPiece != -1) {
                    if (gameState.gamePieces[targetPiece].player != props.player) {
                        captureSpaces[targetPiece] = { position: gameState.gamePieces[targetPiece].position, piece: gameState.gamePieces[targetPiece].piece, player: gameState.gamePieces[targetPiece].player, capture: true }
                    } else {
                    }
                }

            }
            targetPosition = { x: (gameState.gamePieces[props.id].position.x - 1), y: (1 + gameState.gamePieces[props.id].position.y) }
            targetSpace = getSquareIndexFromCoords(targetPosition, gameState.gameBoard)
            targetPiece = getSquareIndexFromCoords(targetPosition, gameState.gamePieces)
            console.log(`Target Space - ${targetSpace} || Target Piece - ${targetPiece} || Piece Position x - ${gameState.gamePieces[props.id].position.x} || Piece Position y - ${gameState.gamePieces[props.id].position.y}`)
            if (targetSpace != -1) {
                if (targetPiece != -1) {
                    if (gameState.gamePieces[targetPiece].player != props.player) {
                        captureSpaces[targetPiece] = { position: gameState.gamePieces[targetPiece].position, piece: gameState.gamePieces[targetPiece].piece, player: gameState.gamePieces[targetPiece].player, capture: true }
                    } else {
                    }
                }

            }
        } else {
            let targetPosition = { x: (1 + gameState.gamePieces[props.id].position.x), y: (gameState.gamePieces[props.id].position.y - 1) }
            let targetSpace = getSquareIndexFromCoords(targetPosition, gameState.gameBoard)
            let targetPiece = getSquareIndexFromCoords(targetPosition, gameState.gamePieces)
            console.log(`Target Space - ${targetSpace} || Target Piece - ${targetPiece} || Piece Position x - ${gameState.gamePieces[props.id].position.x} || Piece Position y - ${gameState.gamePieces[props.id].position.y}`)
            if (targetSpace != -1) {
                if (targetPiece != -1) {
                    if (gameState.gamePieces[targetPiece].player != props.player) {
                        captureSpaces[targetPiece] = { position: gameState.gamePieces[targetPiece].position, piece: gameState.gamePieces[targetPiece].piece, player: gameState.gamePieces[targetPiece].player, capture: true }
                    } else {
                    }
                }

            }
            targetPosition = { x: (gameState.gamePieces[props.id].position.x - 1), y: (gameState.gamePieces[props.id].position.y - 1) }
            targetSpace = getSquareIndexFromCoords(targetPosition, gameState.gameBoard)
            targetPiece = getSquareIndexFromCoords(targetPosition, gameState.gamePieces)
            console.log(`Target Space - ${targetSpace} || Target Piece - ${targetPiece} || Piece Position x - ${gameState.gamePieces[props.id].position.x} || Piece Position y - ${gameState.gamePieces[props.id].position.y}`)
            if (targetSpace != -1) {
                if (targetPiece != -1) {
                    if (gameState.gamePieces[targetPiece].player != props.player) {
                        captureSpaces[targetPiece] = { position: gameState.gamePieces[targetPiece].position, piece: gameState.gamePieces[targetPiece].piece, player: gameState.gamePieces[targetPiece].player, capture: true }
                    } else {
                    }
                }

            }
        }

        dispatch(moveStart({emptySpaces: moveSpaces, captureSpaces: captureSpaces, id: props.id}))
    }

    const capturePiece = async () => {
        const position = gameState.gamePieces[props.id].position
        const oldPosition = gameState.gamePieces[gameState.movePiece].position
        let filteredPieces = await gameState.gamePieces.filter(piece => {
            return (piece.position != position)
        })


        console.log(getSquareIndexFromCoords(oldPosition, filteredPieces))
        filteredPieces[getSquareIndexFromCoords(oldPosition, filteredPieces)] = {position: position, piece: filteredPieces[getSquareIndexFromCoords(oldPosition, filteredPieces)].piece, player: filteredPieces[getSquareIndexFromCoords(oldPosition, filteredPieces)].player, capture: false}
        console.log(filteredPieces)
        dispatch(moveFinish(filteredPieces))
        console.log(gameState.gamePieces)
        
        const result = await fetch(`${SERVER_PATH}/game/move/${gameState.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({move: filteredPieces})
        })
        const sanitizedResult = await result.json()
        console.log(sanitizedResult)
    }

    return (<Box>
        {props.player != gameState.clientPlayer && props.capture ? <Button sx={{borderStyle: 'solid', borderColor: 'red', borderWidth: '4px', height: '100%', width: '100%', padding: '0px'}} onClick={capturePiece}>
    <Box sx={{height: '100%', width: '100%'}} component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Pawn.png`}/>
     </Button>: props.player == gameState.clientPlayer && gameState.playerTurn == props.player ? <Button sx={{height: '100%', width: '100%', padding: '0px'}} onClick={movePiece}>
<Box sx={{height: '100%', width: '100%'}} component="img"
   alt="placeholder"
   src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Pawn.png`}/>
 </Button>: <Box sx={{height: '100%', width: '100%'}}
  component="img"
   alt="placeholder"
   src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Pawn.png`}/>}
   </Box>
    )
}

export default Pawn