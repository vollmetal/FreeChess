import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { imagePath, piecePath } from "../../../constants"
import MovePrediction from "../../../Game Functions/MovePrediction"
import { pieceUpdate } from "../../../store/gameReducer"




const Rook = (props) => {

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [movePredictions, setMovePredictions] = useState({emptySpaces: [], captureSpaces: []})
    const [pieceUpdated, setPieceUpdated] = useState(false)

    useEffect(() => {
        if(pieceUpdated != true ) {
            let rightArray = MovePrediction({x: gameState.gameBoard[props.id].position.x + 1, y: gameState.gameBoard[props.id].position.y}, {x: 8, y: gameState.gameBoard[props.id].position.y}, gameState.gameBoard, props.player)
        let leftArray = MovePrediction({x: gameState.gameBoard[props.id].position.x - 1, y: gameState.gameBoard[props.id].position.y}, {x: 0, y: gameState.gameBoard[props.id].position.y}, gameState.gameBoard, props.player, -1)
        let upArray = MovePrediction({x: gameState.gameBoard[props.id].position.x , y: gameState.gameBoard[props.id].position.y + 1}, {x: gameState.gameBoard[props.id].position.x, y: 8}, gameState.gameBoard, props.player)
        let downArray = MovePrediction({x: gameState.gameBoard[props.id].position.x , y: gameState.gameBoard[props.id].position.y - 1}, {x: gameState.gameBoard[props.id].position.x, y: 0}, gameState.gameBoard, props.player, -1)
        let moveArray = rightArray.spaceArray.concat(leftArray.spaceArray, upArray.spaceArray, downArray.spaceArray)
            setMovePredictions({
                ...movePredictions,
                moveArray: moveArray
            })
            if( gameState.clientPlayer === props.player) {
                dispatch(pieceUpdate({id: props.id, move: 'selectPiece', moves: moveArray}))
            } else {
            }
            setPieceUpdated(true)
        } else {
            return
        }
        
        
    }, [pieceUpdated])

    return (<Box sx={{height: '100%', width: '100%'}}
      component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Rook.png`}/>
   )
}

export default Rook