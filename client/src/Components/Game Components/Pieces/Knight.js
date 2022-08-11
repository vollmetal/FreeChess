import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getSquareIndexFromCoords } from "../../../boardManagement"
import { blackPieceImgPath, imagePath, piecePath } from "../../../constants"
import { moveCancel, moveStart, selectPiece } from "../../../store/gameReducer"




const Knight = (props) => {

    const gameState = useSelector(state => state.game)
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
                    returnSpaces.push({position: targetPosition, type: 'Capture', id: props.id})
                }
            } else {
                returnSpaces.push({position: targetPosition, type: 'Move', id: props.id})
            }
            
        }
        return returnSpaces
    }

    const movePiece = () => {
        let moveSpaces = []
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


        dispatch(moveStart(moveSpaces))
    }

    return (<Box>
        {props.player == gameState.clientPlayer ? <Button onClick={movePiece}>
       <Box sx={{height: '100%', width: '100%'}}
        component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${blackPieceImgPath}/b_Knight.png`}/>
     </Button>: <Box sx={{height: '100%', width: '100%'}}
      component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${blackPieceImgPath}/b_Knight.png`}/>}
       </Box>
        
    )
}

export default Knight