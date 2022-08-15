import { Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { SERVER_PATH } from "../../constants"
import { moveFinish } from "../../store/gameReducer"




const ValidMove = (props) => {

    const gameState = useSelector(state => state.game)

    const dispatch = useDispatch()

    const movePiece = async () => {
        let newPositions = gameState.gamePieces.map(piece => {
                return piece
        })
        newPositions[props.movePiece] = {position: props.position, piece: newPositions[props.movePiece].piece, player: newPositions[props.movePiece].player, capture: false}
        console.log(newPositions)
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