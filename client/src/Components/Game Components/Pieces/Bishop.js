import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSquareIndexFromCoords } from "../../../boardManagement"
import { imagePath, piecePath, SERVER_PATH } from "../../../constants"
import capturePiece from "../../../Game Functions/CapturePiece"
import movePosition from "../../../Game Functions/MovePosition"
import MovePrediction from "../../../Game Functions/MovePrediction"
import { moveCancel, moveFinish, moveStart } from "../../../store/gameReducer"




const Bishop = (props) => {

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [movePredictions, setMovePredictions] = useState({})

    useEffect(() => {
        console.log(`bishop: ${props.player} || position x ${gameState.gameBoard[props.id].position.x} || Position y ${gameState.gameBoard[props.id].position.y}`)
        let downRightArray = MovePrediction({x: gameState.gameBoard[props.id].position.x + 1, y: gameState.gameBoard[props.id].position.y + 1}, {x: 8, y: 8}, gameState, props.player, 1, 'diagonal', 1)
        let downLeftArray = MovePrediction({x: gameState.gameBoard[props.id].position.x - 1, y: gameState.gameBoard[props.id].position.y + 1}, {x: 0, y: 8}, gameState, props.player, -1, 'diagonal', 1)
        let upRightArray = MovePrediction({x: gameState.gameBoard[props.id].position.x + 1 , y: gameState.gameBoard[props.id].position.y - 1}, {x: 8, y: 0}, gameState, props.player, 1, 'diagonal', -1)
        let upLeftArray = MovePrediction({x: gameState.gameBoard[props.id].position.x - 1 , y: gameState.gameBoard[props.id].position.y - 1}, {x: 0, y: 0}, gameState, props.player, -1, 'diagonal', 1)
        let moveArray = downRightArray.spaceArray.concat(downLeftArray.spaceArray, upRightArray.spaceArray, upLeftArray.spaceArray)
        let captureArray = downRightArray.objectArray.concat(downLeftArray.objectArray, upRightArray.objectArray, upLeftArray.objectArray)
            setMovePredictions({
                ...movePredictions,
                emptySpaces: moveArray,
                captureSpaces: captureArray
            })

    }, [])

    

    return (<Box sx={{height: '100%', width: '100%'}}
      component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Bishop.png`}/>
   )
}

export default Bishop