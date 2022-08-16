import CheckMovePosition from "./CheckMovePosition";



const MovePrediction = (startPosition, endPosition, gameArray, playerId, iterate = 1, searchType = 'line', iterateY = 0) => {
    let objectArray = []
    let spaceArray = []
    let hitObject = false
    let diagCount = startPosition.y
    if (iterate > 0) {
        if (searchType === 'line') {
            for (let indexX = startPosition.x; indexX <= endPosition.x; indexX += iterate) {
                for (let indexY = startPosition.y; indexY <= endPosition.y; indexY += iterate) {
                    if (!hitObject) {
                        
                        let spaceData = CheckMovePosition({ x: indexX, y: indexY }, gameArray)
                        switch (spaceData.data.type) {
                            case 'object':
                                if (gameArray.gamePieces[spaceData.data.index].player == playerId) {
                                    hitObject = true
                                } else {
                                    objectArray.push(spaceData.data.index)
                                    hitObject = true
                                }
                                break;
                            case 'space':
                                spaceArray.push(spaceData.data.index)
                                break;
                            case 'null':
                                hitObject = true
                                break;

                            default:
                                break;
                        }
                    }


                }

            }
        } else if (searchType === 'diagonal') {
            for (let indexX = startPosition.x; indexX <= endPosition.x; indexX += iterate) {
                if (!hitObject) {
                    let spaceData = CheckMovePosition({ x: indexX, y: diagCount }, gameArray)
                    switch (spaceData.data.type) {
                        case 'object':
                            if (gameArray.gamePieces[spaceData.data.index].player == playerId) {
                                hitObject = true
                            } else {
                                objectArray.push(spaceData.data.index)
                                hitObject = true
                            }
                            break;
                        case 'space':
                            spaceArray.push(spaceData.data.index)
                            break;
                        case 'null':
                            hitObject = true
                            break;

                        default:
                            break;
                    }
                }
                diagCount += iterateY
            }
        }

    } else {
        if (searchType === 'line') {
            for (let indexX = startPosition.x; indexX >= endPosition.x; indexX += iterate) {
                for (let indexY = startPosition.y; indexY >= endPosition.y; indexY += iterate) {
                    if (!hitObject) {
                        let spaceData = CheckMovePosition({ x: indexX, y: indexY }, gameArray)
                        switch (spaceData.data.type) {
                            case 'object':
                                if (gameArray.gamePieces[spaceData.data.index].player == playerId) {
                                    hitObject = true
                                } else {
                                    objectArray.push(spaceData.data.index)
                                    hitObject = true
                                }
                                break;
                            case 'space':
                                spaceArray.push(spaceData.data.index)
                                break;
                            case 'null':
                                hitObject = true
                                break;

                            default:
                                break;
                        }
                    }

                }

            }
        } else if (searchType === 'diagonal') {
            for (let indexX = startPosition.x; indexX >= endPosition.x; indexX += iterate) {
                if (!hitObject) {
                    let spaceData = CheckMovePosition({ x: indexX, y: diagCount }, gameArray)
                    switch (spaceData.data.type) {
                        case 'object':
                            if (gameArray.gamePieces[spaceData.data.index].player == playerId) {
                                hitObject = true
                            } else {
                                objectArray.push(spaceData.data.index)
                                hitObject = true
                            }
                            break;
                        case 'space':
                            spaceArray.push(spaceData.data.index)
                            break;
                        case 'null':
                            hitObject = true
                            break;

                        default:
                            break;
                    }
                }
                diagCount += iterateY
            }
        }
    }
    if (objectArray.length > 0 || spaceArray.length > 0) {

        return { message: `${objectArray.length + spaceArray.length} spaces were found`, spaceArray: spaceArray, objectArray: objectArray }
    } else {
        return { message: 'no spaces were found!', spaceArray: spaceArray, objectArray: objectArray }
    }
}

export default MovePrediction;