import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSquareIndexFromCoords } from "../../../boardManagement"
import { imagePath, piecePath, SERVER_PATH } from "../../../constants"
import capturePiece from "../../../Game Functions/CapturePiece"
import movePosition from "../../../Game Functions/MovePosition"
import MovePrediction from "../../../Game Functions/MovePrediction"
import { pieceUpdate } from "../../../store/gameReducer"




const Knight = (props) => {

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [movePredictions, setMovePredictions] = useState({emptySpaces: [], captureSpaces: []})
    const [pieceUpdated, setPieceUpdated] = useState(false)


    useEffect (() => {
        if(pieceUpdated != true ) {
            let movePosition = {x: gameState.gameBoard[props.id].position.x - 1, y: gameState.gameBoard[props.id].position.y - 2}
            let topLeft = MovePrediction(movePosition, movePosition, gameState.gameBoard, props.player, 1 )
            movePosition = {x: gameState.gameBoard[props.id].position.x + 1, y: gameState.gameBoard[props.id].position.y - 2}
            let topRight = MovePrediction(movePosition, movePosition, gameState.gameBoard, props.player, 1 )
            movePosition = {x: gameState.gameBoard[props.id].position.x - 1, y: gameState.gameBoard[props.id].position.y + 2}
            let downLeft = MovePrediction(movePosition, movePosition, gameState.gameBoard, props.player, 1 )
            movePosition = {x: gameState.gameBoard[props.id].position.x + 1, y: gameState.gameBoard[props.id].position.y + 2}
            let downRight = MovePrediction(movePosition, movePosition, gameState.gameBoard, props.player, 1 )
            movePosition = {x: gameState.gameBoard[props.id].position.x + 2, y: gameState.gameBoard[props.id].position.y + 1}
            let rightUp = MovePrediction(movePosition, movePosition, gameState.gameBoard, props.player, 1 )
            movePosition = {x: gameState.gameBoard[props.id].position.x + 2, y: gameState.gameBoard[props.id].position.y - 1}
            let rightDown = MovePrediction(movePosition, movePosition, gameState.gameBoard, props.player, 1 )
            movePosition = {x: gameState.gameBoard[props.id].position.x - 2, y: gameState.gameBoard[props.id].position.y + 1}
            let leftUp = MovePrediction(movePosition, movePosition, gameState.gameBoard, props.player, 1 )
            movePosition = {x: gameState.gameBoard[props.id].position.x - 2, y: gameState.gameBoard[props.id].position.y - 1}
            let leftDown = MovePrediction(movePosition, movePosition, gameState.gameBoard, props.player, 1 )
            const moveArray = topLeft.spaceArray.concat(topRight.spaceArray, downLeft.spaceArray, downRight.spaceArray, rightUp.spaceArray, rightDown.spaceArray, leftUp.spaceArray, leftDown.spaceArray)
    
            setMovePredictions({
                ...movePredictions,
                moveArray: moveArray
            })
            if(moveArray.length > 0) {
                if( gameState.clientPlayer === props.player) {
                    dispatch(pieceUpdate({id: props.id, move: 'selectPiece', moves: moveArray}))
                } else {
                }
                
            }
            setPieceUpdated(true)

        } else {
            return
        }

    }, [pieceUpdated])
    return (<Box sx={{height: '100%', width: '100%'}}
      component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Knight.png`}/>
        
    )
}

export default Knight