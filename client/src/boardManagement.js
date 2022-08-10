



export const getSquareIndexFromCoords = (position = {x: 0, y: 0}, array = []) => {
    const index = array.findIndex(square => {return square.position.x === position.x && square.position.y === position.y})
    return index
}