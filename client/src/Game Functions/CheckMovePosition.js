import { getSquareIndexFromCoords } from "./boardManagement"





const CheckMovePosition = (targetPosition, gameArray) => {

    const positionIndex = getSquareIndexFromCoords(targetPosition, gameArray)
    if (positionIndex > -1) {
        if (gameArray[positionIndex].piece != '') {
            return ({ index: positionIndex, piece: 'object' })
        } else {
            return ({ index: positionIndex, piece: 'none' })
        }
    } else {
        return ({ index: positionIndex, piece: 'not a space' })
    }

}

export default CheckMovePosition;