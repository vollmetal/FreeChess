import { Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { SERVER_PATH } from "../../constants"
import { moveFinish } from "../../store/gameReducer"




const ValidMove = (props) => {

    const gameState = useSelector(state => state.game)

    const dispatch = useDispatch()

    const movePiece = async () => {
        const newPositions = await gameState.gamePieces.map(piece => {
            console.log(piece)
            if(piece.position.x == gameState.gamePieces[props.movePiece].position.x && piece.position.y == gameState.gamePieces[props.movePiece].position.y) {
                return {position: props.position, piece: piece.piece, player: piece.player, capture: false}
            } else {
                return piece
            }
        })
        dispatch(moveFinish(newPositions))
        console.log(gameState.gamePieces)
        
        const result = await fetch(`${SERVER_PATH}/game/move/${gameState.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({move: newPositions})
        })
        const sanitizedResult = await result.json()
        console.log(sanitizedResult)
    }

    return (
        <Button sx={{borderStyle: 'solid', borderColor: 'green', borderWidth: '4px', height: '100%', width: '100%'}} onClick={movePiece}></Button>
    )
}

export default ValidMove