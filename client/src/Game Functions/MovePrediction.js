import CheckMovePosition from "./CheckMovePosition";



const MovePrediction = (startPosition, endPosition, gameArray, playerId, iterate = 1, searchType = 'line', iterateY = 0) => {
    let spaceArray = []
    let hitObject = false
    let diagCount = startPosition.y
    if (iterate > 0) {
        if (searchType === 'line') {
            for (let indexX = startPosition.x; indexX <= endPosition.x; indexX += iterate) {
                for (let indexY = startPosition.y; indexY <= endPosition.y; indexY += iterate) {
                    if (!hitObject) {

                        let spaceData = CheckMovePosition({ x: indexX, y: indexY }, gameArray)
                        switch (spaceData.piece) {
                            case 'object':
                                if (gameArray[spaceData.index].player == playerId) {
                                    hitObject = true
                                } else {
                                    spaceArray.push({ index: spaceData.index, type: 'capture' })
                                    hitObject = true
                                }
                                break;
                            case 'none':
                                spaceArray.push({ index: spaceData.index, type: 'move' })
                                break;
                            case 'not a space':
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
                    switch (spaceData.piece) {
                        case 'object':
                            if (gameArray[spaceData.index].player == playerId) {
                                hitObject = true
                            } else {
                                spaceArray.push({ index: spaceData.index, type: 'capture' })
                                hitObject = true
                            }
                            break;
                        case 'none':
                            spaceArray.push({ index: spaceData.index, type: 'move' })
                            break;
                        case 'not a space':
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
                        switch (spaceData.piece) {
                            case 'object':
                                if (gameArray[spaceData.index].player == playerId) {
                                    hitObject = true
                                } else {
                                    spaceArray.push({ index: spaceData.index, type: 'capture' })
                                    hitObject = true
                                }
                                break;
                            case 'none':
                                spaceArray.push({ index: spaceData.index, type: 'move' })
                                break;
                            case 'not a space':
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
                    switch (spaceData.piece) {
                        case 'object':
                            if (gameArray[spaceData.index].player == playerId) {
                                hitObject = true
                            } else {
                                spaceArray.push({ index: spaceData.index, type: 'capture' })
                                hitObject = true
                            }
                            break;
                        case 'none':
                            spaceArray.push({ index: spaceData.index, type: 'move' })
                            break;
                        case 'not a space':
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
    if (spaceArray.length > 0) {

        return { message: `${spaceArray.length} spaces were found`, spaceArray: spaceArray }
    } else {
        return { message: 'no spaces were found!', spaceArray: spaceArray }
    }
}

export default MovePrediction;