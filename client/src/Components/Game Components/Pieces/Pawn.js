import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSquareIndexFromCoords } from "../../../boardManagement"
import { imagePath, piecePath, SERVER_PATH } from "../../../constants"
import capturePiece from "../../../Game Functions/CapturePiece"
import movePosition from "../../../Game Functions/MovePosition"
import MovePrediction from "../../../Game Functions/MovePrediction"
import { moveCancel, moveFinish, moveStart, selectPiece } from "../../../store/gameReducer"




const Pawn = (props) => {

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)

    const [movePredictions, setMovePredictions] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        if(props.player == 1 && gameState) {
            let moveArrays = MovePrediction({x: gameState.gameBoard[props.id].position.x, y: 1 + gameState.gameBoard[props.id].position.y}, {x: gameState.gameBoard[props.id].position.x, y: 2 + gameState.gameBoard[props.id].position.y}, gameState, props.player)
            let captureSpot1 = MovePrediction({x: 1 +  gameState.gameBoard[props.id].position.x, y: 1 + gameState.gameBoard[props.id].position.y}, {x: 1 +  gameState.gameBoard[props.id].position.x, y: 1 + gameState.gameBoard[props.id].position.y}, gameState, props.player)
            let captureSpot2 = MovePrediction({x: gameState.gameBoard[props.id].position.x - 1, y: 1 + gameState.gameBoard[props.id].position.y}, {x: gameState.gameBoard[props.id].position.x - 1, y: 1 + gameState.gameBoard[props.id].position.y}, gameState, props.player)
            setMovePredictions({
                ...movePredictions,
                emptySpaces: moveArrays.spaceArray,
                captureSpaces: (captureSpot1.objectArray.concat(captureSpot2.objectArray))
            })
        } else if(props.player == 2 && gameState) {
            let moveArrays = MovePrediction({x: gameState.gameBoard[props.id].position.x, y: gameState.gameBoard[props.id].position.y - 1}, {x: gameState.gameBoard[props.id].position.x, y: gameState.gameBoard[props.id].position.y - 2}, gameState, props.player, -1)
            let captureSpot1 = MovePrediction({x: 1 +  gameState.gameBoard[props.id].position.x, y: 1 + gameState.gameBoard[props.id].position.y}, {x: 1 +  gameState.gameBoard[props.id].position.x, y: gameState.gameBoard[props.id].position.y - 1}, gameState, props.player, -1)
            let captureSpot2 = MovePrediction({x: gameState.gameBoard[props.id].position.x - 1, y: 1 + gameState.gameBoard[props.id].position.y}, {x: gameState.gameBoard[props.id].position.x - 1, y: gameState.gameBoard[props.id].position.y - 1}, gameState, props.player, -1)
            setMovePredictions({
                ...movePredictions,
                emptySpaces: moveArrays.spaceArray,
                captureSpaces: (captureSpot1.objectArray.concat(captureSpot2.objectArray))
            })
        }
        
    }, [gameState])

    const moveStart = () => {

    }

    return (<Box sx={{height: '100%', width: '100%'}}
  component="img"
   alt="placeholder"
   src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Pawn.png`}/>
    )
}

export default Pawn