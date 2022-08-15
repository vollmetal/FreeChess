import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getSquareIndexFromCoords } from "../../../boardManagement"
import { blackPieceImgPath, imagePath, piecePath, SERVER_PATH } from "../../../constants"
import { moveCancel, moveFinish, moveStart, selectPiece } from "../../../store/gameReducer"




const Knight = (props) => {

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()

    const movePosition = (x, y) => {
        let returnSpaces = []
        let targetPosition = {x: x, y: y}
        let targetSpace = getSquareIndexFromCoords(targetPosition, gameState.gameBoard)
        let targetPiece = getSquareIndexFromCoords(targetPosition, gameState.gamePieces)
        console.log(`Target Space - ${targetSpace} || Target Piece - ${targetPiece} || Piece Position x - ${gameState.gamePieces[props.id].position.x} || Piece Position y - ${gameState.gamePieces[props.id].position.y}`)
        if(targetSpace != -1) {
            if(targetPiece != -1) {
                if(gameState.gamePieces[targetPiece].player != props.player) {
                    returnSpaces.push({targetPiece: targetPiece, position: targetPosition, type: 'Capture', id: props.id})
                }
            } else {
                returnSpaces.push({position: targetPosition, type: 'Move', id: props.id})
            }
            
        }
        return returnSpaces
    }

    const movePiece = () => {
        let moveSpaces = []
        let captureSpaces = gameState.gamePieces.map(piece => {
            return piece
        })
        let tempSpaces = []
        let spaceX = 0
        let spaceY = 1

        

        if( gameState.gameState == 'clientMoving') {
            dispatch(moveCancel())
        }
        tempSpaces = movePosition((2 + gameState.gamePieces[props.id].position.x), (1 + gameState.gamePieces[props.id].position.y))
        moveSpaces = moveSpaces.concat(tempSpaces)
        tempSpaces = movePosition((2 + gameState.gamePieces[props.id].position.x), (gameState.gamePieces[props.id].position.y - 1))
        moveSpaces = moveSpaces.concat(tempSpaces)

        tempSpaces = movePosition((gameState.gamePieces[props.id].position.x - 2), (1 + gameState.gamePieces[props.id].position.y))
        moveSpaces = moveSpaces.concat(tempSpaces)
        tempSpaces = movePosition((gameState.gamePieces[props.id].position.x - 2), (gameState.gamePieces[props.id].position.y - 1))
        moveSpaces = moveSpaces.concat(tempSpaces)


        tempSpaces = movePosition((1 + gameState.gamePieces[props.id].position.x), (2 + gameState.gamePieces[props.id].position.y))
        moveSpaces = moveSpaces.concat(tempSpaces)
        tempSpaces = movePosition((gameState.gamePieces[props.id].position.x - 1), (2 + gameState.gamePieces[props.id].position.y))
        moveSpaces = moveSpaces.concat(tempSpaces)

        tempSpaces = movePosition((1 + gameState.gamePieces[props.id].position.x), (gameState.gamePieces[props.id].position.y - 2))
        moveSpaces = moveSpaces.concat(tempSpaces)
        tempSpaces = movePosition((gameState.gamePieces[props.id].position.x - 1), (gameState.gamePieces[props.id].position.y - 2))
        moveSpaces = moveSpaces.concat(tempSpaces)


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
           src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Knight.png`}/>
         </Button>: props.player == gameState.clientPlayer && gameState.playerTurn == props.player ? <Button sx={{height: '100%', width: '100%', padding: '0px'}} onClick={movePiece}>
    <Box sx={{height: '100%', width: '100%'}} component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Knight.png`}/>
     </Button>: <Box sx={{height: '100%', width: '100%'}}
      component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Knight.png`}/>}
       </Box>
        
    )
}

export default Knight