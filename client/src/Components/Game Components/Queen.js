import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getSquareIndexFromCoords } from "../../boardManagement"
import { blackPieceImgPath, imagePath, piecePath } from "../../constants"
import { moveCancel, moveStart, selectPiece } from "../../store/gameReducer"




const Queen = (props) => {

    const gameState = useSelector(state => state.game)
    const dispatch = useDispatch()

    const movePosition = (x, y) => {
        let returnSpace = {space: null, catch: false}
        let targetPosition = {x: x, y: y}
        let targetSpace = getSquareIndexFromCoords(targetPosition, gameState.gameBoard)
        let targetPiece = getSquareIndexFromCoords(targetPosition, gameState.gamePieces)
        console.log(`Target Space - ${targetSpace} || Target Piece - ${targetPiece} || Piece Position x - ${gameState.gamePieces[props.id].position.x} || Piece Position y - ${gameState.gamePieces[props.id].position.y}`)
        if(targetSpace != -1) {
            if(targetPiece != -1) {
                if(gameState.gamePieces[targetPiece].player != props.player) {
                    returnSpace.space = {position: targetPosition, type: 'Capture', id: props.id}
                    returnSpace.catch = true
                } else {
                    returnSpace.catch = true
                }
            } else {
                returnSpace.space = {position: targetPosition, type: 'Move', id: props.id}
            }
            
        }
        return returnSpace
    }

    const movePiece = () => {
        let moveSpaces = []
        let tempSpace = {}
        let spaceX = 1
        let spaceY = 1

        if( gameState.gameState == 'clientMoving') {
            dispatch(moveCancel())
        }
        console.log(gameState.gamePieces[props.id].position.y)

        console.log('CHECKING TO MOVE DOWN RIGHT------------------------------------------------')
        //////////////////DOWN RIGHT ///////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        while ((spaceY + gameState.gamePieces[props.id].position.y) < 9 && (spaceX + gameState.gamePieces[props.id].position.x) < 9) {
            tempSpace = movePosition((spaceX + gameState.gamePieces[props.id].position.x), (spaceY + gameState.gamePieces[props.id].position.y))
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
                break;
            } else {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
            }
            spaceY++
            spaceX++
        }

        spaceX = 1
        spaceY = 1
        console.log('CHECKING TO MOVE UP RIGHT------------------------------------------------')
        ////////////////////UP RIGHT////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        while ((gameState.gamePieces[props.id].position.y - spaceY) > 0 && (spaceX + gameState.gamePieces[props.id].position.x) < 9) {
            tempSpace = movePosition((spaceX + gameState.gamePieces[props.id].position.x), (gameState.gamePieces[props.id].position.y - spaceY))
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
                break;
            } else {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
            }
            spaceY++
            spaceX++
        }

        spaceX = 1
        spaceY = 1
        console.log('CHECKING TO MOVE UP LEFT------------------------------------------------')
        ////////////////////UP LEFT////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        while ((gameState.gamePieces[props.id].position.y - spaceY) > 0 && (gameState.gamePieces[props.id].position.x - spaceX) > 0) {
            tempSpace = movePosition((gameState.gamePieces[props.id].position.x - spaceX), (gameState.gamePieces[props.id].position.y - spaceY))
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
                break;
            } else {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
            }
            spaceY++
            spaceX++
        }

        spaceX = 1
        spaceY = 1
        console.log('CHECKING TO MOVE DOWN LEFT------------------------------------------------')
        ////////////////////DOWN LEFT////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        while ((spaceY + gameState.gamePieces[props.id].position.y) < 9 && (gameState.gamePieces[props.id].position.x - spaceX) > 0) {
            let targetPosition = {x: (gameState.gamePieces[props.id].position.x - spaceX), y: (spaceY + gameState.gamePieces[props.id].position.y)}
            tempSpace = movePosition((gameState.gamePieces[props.id].position.x - spaceX), (spaceY + gameState.gamePieces[props.id].position.y))
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
                break;
            } else {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
            }
            spaceY++
            spaceX++
        }

        //////////////////UP///////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        while ((gameState.gamePieces[props.id].position.y - spaceY) > 0) {
            tempSpace = movePosition(gameState.gamePieces[props.id].position.x, (gameState.gamePieces[props.id].position.y - spaceY))
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
                break;
            } else {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
            }
            spaceY++
        }

        spaceX = 1
        spaceY = 1
        ////////////////////RIGHT////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        while ((spaceX + gameState.gamePieces[props.id].position.x) < 9) {
            tempSpace = movePosition((spaceX + gameState.gamePieces[props.id].position.x), gameState.gamePieces[props.id].position.y)
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
                break;
            } else {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
            }
            spaceX++
        }

        spaceX = 1
        spaceY = 1
        ////////////////////LEFT////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        while ((gameState.gamePieces[props.id].position.x - spaceX) > 0) {
            tempSpace = movePosition((gameState.gamePieces[props.id].position.x - spaceX), gameState.gamePieces[props.id].position.y)
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
                break;
            } else {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
            }
            spaceX++
        }

        spaceX = 1
        spaceY = 1
        ////////////////////DOWN////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        while ((spaceY + gameState.gamePieces[props.id].position.y) < 9) {
            tempSpace = movePosition(gameState.gamePieces[props.id].position.x, (spaceY + gameState.gamePieces[props.id].position.y))
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
                break;
            } else {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
            }
            spaceY++
        }

        dispatch(moveStart(moveSpaces))
    }

    return (<Box>
        {props.player == gameState.clientPlayer ? <Button onClick={movePiece}>
       <Box component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${blackPieceImgPath}/b_Queen.png`}/>
     </Button>: <Box component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${blackPieceImgPath}/b_Queen.png`}/>}
       </Box>
        
    )
}

export default Queen