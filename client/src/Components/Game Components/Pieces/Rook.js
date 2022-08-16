import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSquareIndexFromCoords } from "../../../boardManagement"
import { imagePath, piecePath, SERVER_PATH } from "../../../constants"
import capturePiece from "../../../Game Functions/CapturePiece"
import movePosition from "../../../Game Functions/MovePosition"
import MovePrediction from "../../../Game Functions/MovePrediction"
import { moveCancel, moveFinish, moveStart } from "../../../store/gameReducer"




const Rook = (props) => {

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [movePredictions, setMovePredictions] = useState({})

    useEffect(() => {
        let rightArray = MovePrediction({x: gameState.gameBoard[props.id].position.x + 1, y: gameState.gameBoard[props.id].position.y}, {x: 8, y: gameState.gameBoard[props.id].position.y}, gameState, props.player)
        let leftArray = MovePrediction({x: gameState.gameBoard[props.id].position.x - 1, y: gameState.gameBoard[props.id].position.y}, {x: 0, y: gameState.gameBoard[props.id].position.y}, gameState, props.player, -1)
        let upArray = MovePrediction({x: gameState.gameBoard[props.id].position.x , y: gameState.gameBoard[props.id].position.y + 1}, {x: gameState.gameBoard[props.id].position.x, y: 8}, gameState, props.player)
        let downArray = MovePrediction({x: gameState.gameBoard[props.id].position.x , y: gameState.gameBoard[props.id].position.y - 1}, {x: gameState.gameBoard[props.id].position.x, y: 0}, gameState, props.player, -1)
        let moveArray = rightArray.spaceArray.concat(leftArray.spaceArray, upArray.spaceArray, downArray.spaceArray)
        let captureArray = rightArray.objectArray.concat(leftArray.objectArray, upArray.objectArray, downArray.objectArray)
            setMovePredictions({
                ...movePredictions,
                emptySpaces: moveArray,
                captureSpaces: captureArray
            })
        
    }, [])

    return (<Box sx={{height: '100%', width: '100%'}}
      component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Rook.png`}/>
   )
}

export default Rook