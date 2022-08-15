import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getSquareIndexFromCoords } from "../../../boardManagement"
import { blackPieceImgPath, imagePath, piecePath, SERVER_PATH } from "../../../constants"
import { moveCancel, moveFinish, moveStart, selectPiece } from "../../../store/gameReducer"




const King = (props) => {

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

      tempSpace = movePosition((1 + gameState.gamePieces[props.id].position.x), (1 + gameState.gamePieces[props.id].position.y))
          if(tempSpace.catch) {
              if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }

          tempSpace = movePosition((1 + gameState.gamePieces[props.id].position.x), (gameState.gamePieces[props.id].position.y - 1))
          if(tempSpace.catch) {
              if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }

      tempSpace = movePosition((1 + gameState.gamePieces[props.id].position.x), gameState.gamePieces[props.id].position.y)
          if(tempSpace.catch) {
              if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }

          tempSpace = movePosition((gameState.gamePieces[props.id].position.x - 1), (gameState.gamePieces[props.id].position.y - 1))
          if(tempSpace.catch) {
              if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }

          tempSpace = movePosition((gameState.gamePieces[props.id].position.x - 1), (1 + gameState.gamePieces[props.id].position.y))
          if(tempSpace.catch) {
              if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }
          tempSpace = movePosition(gameState.gamePieces[props.id].position.x, (gameState.gamePieces[props.id].position.y - 1))
          if(tempSpace.catch) {
              if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }

          tempSpace = movePosition(gameState.gamePieces[props.id].position.x, (1 + gameState.gamePieces[props.id].position.y))
          if(tempSpace.catch) {
              if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
              }
          }

          tempSpace = movePosition((gameState.gamePieces[props.id].position.x - 1), gameState.gamePieces[props.id].position.y)
          if(tempSpace.catch) {
              if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
              }
          } else {
              if(tempSpace.space) {
                  moveSpaces.push(tempSpace.space)
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
           src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/King.png`}/>
         </Button>: props.player == gameState.clientPlayer && gameState.playerTurn == props.player ? <Button sx={{height: '100%', width: '100%', padding: '0px'}} onClick={movePiece}>
    <Box sx={{height: '100%', width: '100%'}} component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/King.png`}/>
     </Button>: <Box sx={{height: '100%', width: '100%'}}
      component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/King.png`}/>}
     </Box>
        
    )
}

export default King