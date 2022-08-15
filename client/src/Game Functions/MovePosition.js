import { getSquareIndexFromCoords } from "../boardManagement"




const movePosition = (x, y, targetBoard, targetPieceArray, pieceId, player) => {
    let returnSpace = {space: null, catch: false}
    let targetPosition = {x: x, y: y}
    let targetSpace = getSquareIndexFromCoords(targetPosition, targetBoard)
    let targetPiece = getSquareIndexFromCoords(targetPosition, targetPieceArray)
    console.log(`Target Space - ${targetSpace} || Target Piece - ${targetPiece} || Piece Position x - ${targetPieceArray[pieceId].position.x} || Piece Position y - ${targetPieceArray[pieceId].position.y}`)
    if(targetSpace !== -1) {
        if(targetPiece !== -1) {
            if(targetPieceArray[targetPiece].player !== player) {
                returnSpace.space = {targetPiece: targetPiece, position: targetPosition, type: 'Capture', id: pieceId}
                returnSpace.catch = true
            } else {
                returnSpace.catch = true
            }
        } else {
            returnSpace.space = {position: targetPosition, type: 'Move', id: pieceId}
        }
        
    }
    return returnSpace
}

export default movePosition