import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { imagePath, piecePath, SERVER_PATH } from "../../../constants"
import MovePrediction from "../../../Game Functions/MovePrediction"
import { pieceUpdate } from "../../../store/gameReducer"




const King = (props) => {

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [movePredictions, setMovePredictions] = useState({emptySpaces: [], captureSpaces: []})
    const [pieceUpdated, setPieceUpdated] = useState(false)


    useEffect (() => {
            let downRightArray = MovePrediction({x: gameState.gameBoard[props.id].position.x + 1, y: gameState.gameBoard[props.id].position.y + 1}, {x: gameState.gameBoard[props.id].position.x + 1, y: gameState.gameBoard[props.id].position.y + 1}, gameState.gameBoard, props.player, 1, 'diagonal', 1)
        let downLeftArray = MovePrediction({x: gameState.gameBoard[props.id].position.x - 1, y: gameState.gameBoard[props.id].position.y + 1}, {x: gameState.gameBoard[props.id].position.x - 1, y: gameState.gameBoard[props.id].position.y + 1}, gameState.gameBoard, props.player, -1, 'diagonal', 1)
        let upRightArray = MovePrediction({x: gameState.gameBoard[props.id].position.x + 1 , y: gameState.gameBoard[props.id].position.y - 1}, {x: gameState.gameBoard[props.id].position.x + 1 , y: gameState.gameBoard[props.id].position.y - 1}, gameState.gameBoard, props.player, 1, 'diagonal', -1)
        let upLeftArray = MovePrediction({x: gameState.gameBoard[props.id].position.x - 1 , y: gameState.gameBoard[props.id].position.y - 1}, {x: gameState.gameBoard[props.id].position.x - 1 , y: gameState.gameBoard[props.id].position.y - 1}, gameState.gameBoard, props.player, -1, 'diagonal', 1)
        let rightArray = MovePrediction({x: gameState.gameBoard[props.id].position.x + 1, y: gameState.gameBoard[props.id].position.y}, {x: gameState.gameBoard[props.id].position.x + 1, y: gameState.gameBoard[props.id].position.y}, gameState.gameBoard, props.player)
        let leftArray = MovePrediction({x: gameState.gameBoard[props.id].position.x - 1, y: gameState.gameBoard[props.id].position.y}, {x: gameState.gameBoard[props.id].position.x - 1, y: gameState.gameBoard[props.id].position.y}, gameState.gameBoard, props.player, -1)
        let upArray = MovePrediction({x: gameState.gameBoard[props.id].position.x , y: gameState.gameBoard[props.id].position.y + 1}, {x: gameState.gameBoard[props.id].position.x , y: gameState.gameBoard[props.id].position.y + 1}, gameState.gameBoard, props.player)
        let downArray = MovePrediction({x: gameState.gameBoard[props.id].position.x , y: gameState.gameBoard[props.id].position.y - 1}, {x: gameState.gameBoard[props.id].position.x , y: gameState.gameBoard[props.id].position.y - 1}, gameState.gameBoard, props.player, -1)
        let moveArray = downRightArray.spaceArray.concat(downLeftArray.spaceArray, upRightArray.spaceArray, upLeftArray.spaceArray, leftArray.spaceArray, rightArray.spaceArray, downArray.spaceArray, upArray.spaceArray)
        if(moveArray.length > 0) {
            if( gameState.clientPlayer === props.player) {
                dispatch(pieceUpdate({id: props.id, move: 'selectPiece', moves: moveArray}))
            } else {
            }
            
        }
    }, [gameState.render])

    return (<Box sx={{height: '100%', width: '100%'}}
      component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/King.png`}/>        
    )
}

export default King