import { Box } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { imagePath, piecePath } from "../../../constants"
import MovePrediction from "../../../Game Functions/MovePrediction"
import { pieceUpdate } from "../../../store/gameReducer"




const Knight = (props) => {

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()


    useEffect (() => {
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

            if(moveArray.length > 0) {
                moveArray.map(position => {
                    
                    if(gameState.gameBoard[position.index].piece === 'King' && gameState.gameBoard[position.index].player != props.player && gameState.gameBoard[position.index].player === gameState.clientPlayer) {
                        console.log(gameState.gameBoard[position.index])
                        console.log(`Piece ${props.id} can capture their king!`)
                    }
                })
                if( gameState.clientPlayer === props.player) {
                    dispatch(pieceUpdate({id: props.id, move: 'selectPiece', moves: moveArray}))
                } else {
                }
                
            }
    }, [gameState.render])
    return (<Box sx={{height: '100%', width: '100%'}}
      component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Knight.png`}/>
        
    )
}

export default Knight