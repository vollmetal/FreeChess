import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { imagePath, piecePath } from "../../../constants"
import MovePrediction from "../../../Game Functions/MovePrediction"
import { pieceUpdate } from "../../../store/gameReducer"




const Pawn = (props) => {

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)

    const [movePredictions, setMovePredictions] = useState({emptySpaces: [], captureSpaces: []})
    const [pieceUpdated, setPieceUpdated] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
            let moveArray = []
            let captureArray = []
            let position = {x: gameState.gameBoard[props.id].position.x, y: gameState.gameBoard[props.id].position.y}
            if(props.player == 1 && gameState) {
                if(position.y == 2) {
                    moveArray = moveArray.concat(MovePrediction({x: position.x, y: 1 + position.y}, {x: position.x, y: 2 + position.y}, gameState.gameBoard, props.player).spaceArray)
                } else {
                    moveArray = moveArray.concat(MovePrediction({x: position.x, y: 1 + position.y}, {x: position.x, y: 1 + position.y}, gameState.gameBoard, props.player).spaceArray)
                }
                
                captureArray = captureArray.concat(MovePrediction({x: 1 +  position.x, y: 1 + position.y}, {x: 1 +  position.x, y: 1 + position.y}, gameState.gameBoard, props.player).spaceArray)
                captureArray = captureArray.concat(MovePrediction({x: position.x - 1, y: 1 + position.y}, {x: position.x - 1, y: 1 + position.y}, gameState.gameBoard, props.player).spaceArray)
                                
            } else if(props.player == 2 && gameState) {
                
                if(position.y == 2) {
                    moveArray = moveArray.concat(MovePrediction({x: position.x, y: position.y - 1}, {x: position.x, y: position.y - 2}, gameState.gameBoard, props.player, -1).spaceArray)
                } else {
                    moveArray = moveArray.concat(MovePrediction({x: position.x, y: position.y - 1}, {x: position.x, y: position.y - 1}, gameState.gameBoard, props.player, -1).spaceArray)
                }
                captureArray = captureArray.concat(MovePrediction({x: 1 +  position.x, y: position.y - 1}, {x: 1 +  position.x, y: position.y - 1}, gameState.gameBoard, props.player, -1).spaceArray)
                captureArray = captureArray.concat(MovePrediction({x: position.x - 1, y: position.y - 1}, {x: position.x - 1, y: position.y - 1}, gameState.gameBoard, props.player, -1).spaceArray)
                                
            }
            captureArray = captureArray.filter(element => {if(element.type == 'capture') {return element}})
            moveArray = moveArray.filter(element => {return element.type == 'move'})
            moveArray = moveArray.concat(captureArray)
            
            if(moveArray.length > 0) {
                moveArray.map(position => {
                    if(gameState.gameBoard[position.index].piece === 'King' && gameState.gameBoard[position.index].player != props.player) {
                        console.log('I can capture their king!')
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
   src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Pawn.png`}/>
    )
}

export default Pawn