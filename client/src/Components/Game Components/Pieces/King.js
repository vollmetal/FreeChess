import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getSquareIndexFromCoords } from "../../../boardManagement"
import { blackPieceImgPath, imagePath, piecePath } from "../../../constants"
import { moveCancel, moveStart, selectPiece } from "../../../store/gameReducer"




const King = (props) => {

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

      tempSpace = movePosition((1 + gameState.gamePieces[props.id].position.x), (1 + gameState.gamePieces[props.id].position.y))
          if(tempSpace.catch) {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }

          tempSpace = movePosition((1 + gameState.gamePieces[props.id].position.x), (gameState.gamePieces[props.id].position.y - 1))
          if(tempSpace.catch) {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }

      tempSpace = movePosition((1 + gameState.gamePieces[props.id].position.x), gameState.gamePieces[props.id].position.y)
          if(tempSpace.catch) {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }

          tempSpace = movePosition((gameState.gamePieces[props.id].position.x - 1), (gameState.gamePieces[props.id].position.y - 1))
          if(tempSpace.catch) {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }

          tempSpace = movePosition((gameState.gamePieces[props.id].position.x - 1), (1 + gameState.gamePieces[props.id].position.y))
          if(tempSpace.catch) {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }
          tempSpace = movePosition(gameState.gamePieces[props.id].position.x, (gameState.gamePieces[props.id].position.y - 1))
          if(tempSpace.catch) {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }

          tempSpace = movePosition(gameState.gamePieces[props.id].position.x, (1 + gameState.gamePieces[props.id].position.y))
          if(tempSpace.catch) {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }

          tempSpace = movePosition((gameState.gamePieces[props.id].position.x - 1), gameState.gamePieces[props.id].position.y)
          if(tempSpace.catch) {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }

      dispatch(moveStart(moveSpaces))
  }

    return (<Box>
      {props.player == gameState.clientPlayer ? <Button onClick={movePiece}>
     <Box sx={{height: '100%', width: '100%'}} component="img"
     alt="placeholder"
     src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${blackPieceImgPath}/b_King.png`}/>
   </Button>: <Box sx={{height: '100%', width: '100%'}}
    component="img"
     alt="placeholder"
     src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${blackPieceImgPath}/b_King.png`}/>}
     </Box>
        
    )
}

export default King