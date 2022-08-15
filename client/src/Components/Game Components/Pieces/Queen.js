import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getSquareIndexFromCoords } from "../../../boardManagement"
import { blackPieceImgPath, imagePath, piecePath, SERVER_PATH } from "../../../constants"
import { moveCancel, moveFinish, moveStart, selectPiece } from "../../../store/gameReducer"




const Queen = (props) => {

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)
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
                    returnSpace.space = {targetPiece: targetPiece, position: targetPosition, type: 'Capture', id: props.id}
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
        let captureSpaces = gameState.gamePieces.map(piece => {
            return piece
        })
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
        console.log('CHECKING TO MOVE UP RIGHT------------------------------------------------')
        ////////////////////UP RIGHT////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        while ((gameState.gamePieces[props.id].position.y - spaceY) > 0 && (spaceX + gameState.gamePieces[props.id].position.x) < 9) {
            tempSpace = movePosition((spaceX + gameState.gamePieces[props.id].position.x), (gameState.gamePieces[props.id].position.y - spaceY))
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
        console.log('CHECKING TO MOVE UP LEFT------------------------------------------------')
        ////////////////////UP LEFT////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        while ((gameState.gamePieces[props.id].position.y - spaceY) > 0 && (gameState.gamePieces[props.id].position.x - spaceX) > 0) {
            tempSpace = movePosition((gameState.gamePieces[props.id].position.x - spaceX), (gameState.gamePieces[props.id].position.y - spaceY))
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
            let targetPosition = {x: (gameState.gamePieces[props.id].position.x - spaceX), y: (spaceY + gameState.gamePieces[props.id].position.y)}
            tempSpace = movePosition((gameState.gamePieces[props.id].position.x - spaceX), (spaceY + gameState.gamePieces[props.id].position.y))
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
            tempSpace = movePosition(gameState.gamePieces[props.id].position.x, (gameState.gamePieces[props.id].position.y - spaceY))
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
            tempSpace = movePosition((spaceX + gameState.gamePieces[props.id].position.x), gameState.gamePieces[props.id].position.y)
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
            tempSpace = movePosition((gameState.gamePieces[props.id].position.x - spaceX), gameState.gamePieces[props.id].position.y)
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
            tempSpace = movePosition(gameState.gamePieces[props.id].position.x, (spaceY + gameState.gamePieces[props.id].position.y))
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