import { getSquareIndexFromCoords } from "../boardManagement";




const CheckMovePosition = (targetPosition, gameArray) => {
    const positionIndex = getSquareIndexFromCoords(targetPosition, gameArray.gameBoard)
    if( positionIndex > -1) {
        const objectIndex = getSquareIndexFromCoords(targetPosition, gameArray.gamePieces)
        if (objectIndex > -1) {
            return ({message: `object found at ${objectIndex}`, data: {type: 'object', index: objectIndex}})
        } else {
            return ({message: `no object found at ${positionIndex}`, data: {type: 'space', index: positionIndex}})
        }
    } else {
        return ({message: `no tile found!`, data: {type: 'null', index: positionIndex}})
    }
}

export default CheckMovePosition;