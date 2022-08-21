import { Box } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { imagePath, piecePath } from "../../../constants"
import MovePrediction from "../../../Game Functions/MovePrediction"
import { pieceUpdate } from "../../../store/gameReducer"




const Bishop = (props) => {

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
            let downRightArray = MovePrediction({ x: gameState.gameBoard[props.id].position.x + 1, y: gameState.gameBoard[props.id].position.y + 1 }, { x: 8, y: 8 }, gameState.gameBoard, props.player, 1, 'diagonal', 1)
            let downLeftArray = MovePrediction({ x: gameState.gameBoard[props.id].position.x - 1, y: gameState.gameBoard[props.id].position.y + 1 }, { x: 0, y: 8 }, gameState.gameBoard, props.player, -1, 'diagonal', 1)
            let upRightArray = MovePrediction({ x: gameState.gameBoard[props.id].position.x + 1, y: gameState.gameBoard[props.id].position.y - 1 }, { x: 8, y: 0 }, gameState.gameBoard, props.player, 1, 'diagonal', -1)
            let upLeftArray = MovePrediction({ x: gameState.gameBoard[props.id].position.x - 1, y: gameState.gameBoard[props.id].position.y - 1 }, { x: 0, y: 0 }, gameState.gameBoard, props.player, -1, 'diagonal', 1)
            let moveArray = downRightArray.spaceArray.concat(downLeftArray.spaceArray, upRightArray.spaceArray, upLeftArray.spaceArray)
            
            if(moveArray.length > 0) {
                moveArray.map(position => {
                    
                    if(gameState.gameBoard[position.index].piece === 'King' && gameState.gameBoard[position.index].player != props.player) {
                        console.log(gameState.gameBoard[position.index].piece)
                        console.log('I can capture their king!')
                    }
                })
                if( gameState.clientPlayer === props.player) {
                    dispatch(pieceUpdate({id: props.id, move: 'selectPiece', moves: moveArray}))
                } else {
                }
                
            }


    }, [gameState.render])



    return (<Box sx={{ height: '100%', width: '100%' }}
        component="img"
        alt="placeholder"
        src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player - 1]}/Bishop.png`} />
    )
}

export default Bishop