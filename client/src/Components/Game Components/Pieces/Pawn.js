import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getSquareIndexFromCoords } from "../../../boardManagement"
import { blackPieceImgPath, imagePath, piecePath } from "../../../constants"
import { moveCancel, moveStart, selectPiece } from "../../../store/gameReducer"




const Pawn = (props) => {

    const gameState = useSelector(state => state.game)
    const dispatch = useDispatch()

    const movePosition = (x, y) => {
        let returnSpace = { space: null, catch: false }
        let targetPosition = { x: x, y: y }
        let targetSpace = getSquareIndexFromCoords(targetPosition, gameState.gameBoard)
        let targetPiece = getSquareIndexFromCoords(targetPosition, gameState.gamePieces)
        console.log(`Target Space - ${targetSpace} || Target Piece - ${targetPiece} || Piece Position x - ${gameState.gamePieces[props.id].position.x} || Piece Position y - ${gameState.gamePieces[props.id].position.y}`)
        if (targetSpace != -1) {
            if (targetPiece != -1) {
                if (gameState.gamePieces[targetPiece].player != props.player) {
                    returnSpace.space = { position: targetPosition, type: 'Capture', id: props.id }
                    returnSpace.catch = true
                } else {
                    returnSpace.catch = true
                }
            } else {
                returnSpace.space = { position: targetPosition, type: 'Move', id: props.id }
            }

        }
        return returnSpace
    }

    const movePiece = () => {
        let moveSpaces = []
        let tempSpace = {}
        let spaceX = 0
        let spaceY = 1

        if (gameState.gameState == 'clientMoving') {
            dispatch(moveCancel())
        }
        while (spaceY <= 2) {
            if (props.player == 1) {
                tempSpace = movePosition((spaceX + gameState.gamePieces[props.id].position.x), (spaceY + gameState.gamePieces[props.id].position.y))
                if (tempSpace.catch) {
                    break;
                } else {
                    if(tempSpace.space) {
                        console.log(tempSpace)
                        moveSpaces.push(tempSpace.space)
                    }
                    
                }
            } else {
                tempSpace = movePosition((spaceX + gameState.gamePieces[props.id].position.x), (gameState.gamePieces[props.id].position.y - spaceY))
                if (tempSpace.catch) {
                    break;
                } else {
                    if(tempSpace.space) {
                        moveSpaces.push(tempSpace.space)
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
                        moveSpaces.push ({ position: targetPosition, type: 'Capture', id: props.id })
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
                        moveSpaces.push ({ position: targetPosition, type: 'Capture', id: props.id })
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
                        moveSpaces.push ({ position: targetPosition, type: 'Capture', id: props.id })
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
                        moveSpaces.push ({ position: targetPosition, type: 'Capture', id: props.id })
                    } else {
                    }
                }

            }
        }

        dispatch(moveStart(moveSpaces))
    }

    return (<Box>
        {props.player == gameState.clientPlayer ? <Button onClick={movePiece}>
            <Box sx={{height: '100%', width: '100%'}}
             component="img"
                alt="placeholder"
                src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${blackPieceImgPath}/b_Pawn.png`} />
        </Button> : <Box sx={{height: '100%', width: '100%'}}
         component="img"
            alt="placeholder"
            src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${blackPieceImgPath}/b_Pawn.png`} />}
    </Box>
    )
}

export default Pawn