import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getSquareIndexFromCoords } from "../../../boardManagement"
import { imagePath, piecePath, SERVER_PATH } from "../../../constants"
import capturePiece from "../../../Game Functions/CapturePiece"
import movePosition from "../../../Game Functions/MovePosition"
import { moveCancel, moveFinish, moveStart } from "../../../store/gameReducer"




const Queen = (props) => {

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()

    const movePiece = () => {
        let moveSpaces = []
        let captureSpaces = gameState.gamePieces.map(piece => {
            return piece
        })
        let tempSpace = {}
        let spaceX = 1
        let spaceY = 1

        if( gameState.gameState == 'clientMoving') {
            dispatch(moveCancel())
        }
        //////////////////DOWN RIGHT ///////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        while ((spaceY + gameState.gamePieces[props.id].position.y) < 9 && (spaceX + gameState.gamePieces[props.id].position.x) < 9) {
            tempSpace = movePosition((spaceX + gameState.gamePieces[props.id].position.x), (spaceY + gameState.gamePieces[props.id].position.y), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
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
        ////////////////////UP RIGHT////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        while ((gameState.gamePieces[props.id].position.y - spaceY) > 0 && (spaceX + gameState.gamePieces[props.id].position.x) < 9) {
            tempSpace = movePosition((spaceX + gameState.gamePieces[props.id].position.x), (gameState.gamePieces[props.id].position.y - spaceY), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
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
        ////////////////////UP LEFT////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        while ((gameState.gamePieces[props.id].position.y - spaceY) > 0 && (gameState.gamePieces[props.id].position.x - spaceX) > 0) {
            tempSpace = movePosition((gameState.gamePieces[props.id].position.x - spaceX), (gameState.gamePieces[props.id].position.y - spaceY), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
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
            tempSpace = movePosition((gameState.gamePieces[props.id].position.x - spaceX), (spaceY + gameState.gamePieces[props.id].position.y), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
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
            tempSpace = movePosition(gameState.gamePieces[props.id].position.x, (gameState.gamePieces[props.id].position.y - spaceY), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
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
            tempSpace = movePosition((spaceX + gameState.gamePieces[props.id].position.x), gameState.gamePieces[props.id].position.y, gameState.gameBoard, gameState.gamePieces, props.id, props.player)
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
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
            tempSpace = movePosition((gameState.gamePieces[props.id].position.x - spaceX), gameState.gamePieces[props.id].position.y, gameState.gameBoard, gameState.gamePieces, props.id, props.player)
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
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
            tempSpace = movePosition(gameState.gamePieces[props.id].position.x, (spaceY + gameState.gamePieces[props.id].position.y), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
            if(tempSpace.catch) {
                if(tempSpace.space) {
                    captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
                }
                break;
            } else {
                if(tempSpace.space) {
                    moveSpaces.push(tempSpace.space)
                }
            }
            spaceY++
        }

        dispatch(moveStart({emptySpaces: moveSpaces, captureSpaces: captureSpaces, id: props.id}))
    }

    

    return (<Box sx={{height: '100%', width: '100%', padding: '0px'}}>
        {props.player != gameState.clientPlayer && props.capture ? <Button sx={{borderStyle: 'solid', borderColor: 'red', borderWidth: '4px', height: '100%', width: '100%', padding: '0px'}} onClick={() => {capturePiece(gameState, props.id, dispatch)}}>
        <Box sx={{height: '100%', width: '100%'}} component="img"
           alt="placeholder"
           src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Queen.png`}/>
         </Button>: props.player == gameState.clientPlayer && gameState.playerTurn == props.player ? <Button sx={{height: '100%', width: '100%', padding: '0px'}} onClick={movePiece}>
    <Box sx={{height: '100%', width: '100%'}} component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Queen.png`}/>
     </Button>: <Box sx={{height: '100%', width: '100%'}}
      component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Queen.png`}/>}
       </Box>
        
    )
}

export default Queen