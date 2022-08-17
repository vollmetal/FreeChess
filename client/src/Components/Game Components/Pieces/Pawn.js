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
        if(pieceUpdated !== true) {
            let moveArray = []
            let captureArray = []
            if(props.player == 1 && gameState) {
                moveArray = moveArray.concat(MovePrediction({x: gameState.gameBoard[props.id].position.x, y: 1 + gameState.gameBoard[props.id].position.y}, {x: gameState.gameBoard[props.id].position.x, y: 2 + gameState.gameBoard[props.id].position.y}, gameState.gameBoard, props.player).spaceArray)
                captureArray = captureArray.concat(MovePrediction({x: 1 +  gameState.gameBoard[props.id].position.x, y: 1 + gameState.gameBoard[props.id].position.y}, {x: 1 +  gameState.gameBoard[props.id].position.x, y: 1 + gameState.gameBoard[props.id].position.y}, gameState.gameBoard, props.player).spaceArray)
                captureArray = captureArray.concat(MovePrediction({x: gameState.gameBoard[props.id].position.x - 1, y: 1 + gameState.gameBoard[props.id].position.y}, {x: gameState.gameBoard[props.id].position.x - 1, y: 1 + gameState.gameBoard[props.id].position.y}, gameState.gameBoard, props.player).spaceArray)
                                
            } else if(props.player == 2 && gameState) {
                
                moveArray = moveArray.concat(MovePrediction({x: gameState.gameBoard[props.id].position.x, y: gameState.gameBoard[props.id].position.y - 1}, {x: gameState.gameBoard[props.id].position.x, y: gameState.gameBoard[props.id].position.y - 2}, gameState.gameBoard, props.player, -1).spaceArray)
                captureArray = captureArray.concat(MovePrediction({x: 1 +  gameState.gameBoard[props.id].position.x, y: gameState.gameBoard[props.id].position.y - 1}, {x: 1 +  gameState.gameBoard[props.id].position.x, y: gameState.gameBoard[props.id].position.y - 1}, gameState.gameBoard, props.player, -1).spaceArray)
                captureArray = captureArray.concat(MovePrediction({x: gameState.gameBoard[props.id].position.x - 1, y: gameState.gameBoard[props.id].position.y - 1}, {x: gameState.gameBoard[props.id].position.x - 1, y: gameState.gameBoard[props.id].position.y - 1}, gameState.gameBoard, props.player, -1).spaceArray)
                                
            }
            captureArray = captureArray.filter(element => {if(element.type == 'capture') {return element}})
            moveArray = moveArray.filter(element => {return element.type == 'move'})
            moveArray = moveArray.concat(captureArray)
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
   src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Pawn.png`}/>
    )
}

export default Pawn