
import { getSquareIndexFromCoords } from "../boardManagement"
import { SERVER_PATH } from "../constants"
import { moveFinish } from "../store/gameReducer"

const capturePiece = async (gameState, pieceId, dispatch) => {
    const position = gameState.gamePieces[pieceId].position
    const oldPosition = gameState.gamePieces[gameState.movePiece].position
    let filteredPieces = await gameState.gamePieces.filter(piece => {
        return (piece.position != position)
    })

    filteredPieces[getSquareIndexFromCoords(oldPosition, filteredPieces)] = {position: position, piece: filteredPieces[getSquareIndexFromCoords(oldPosition, filteredPieces)].piece, player: filteredPieces[getSquareIndexFromCoords(oldPosition, filteredPieces)].player, capture: false}
    dispatch(moveFinish(filteredPieces))
    
    const result = await fetch(`${SERVER_PATH}/game/move/${gameState.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({move: filteredPieces})
    })
    const sanitizedResult = await result.json()
}

export default capturePiece;