

export let GridSetup = (x, y) => {
    let outputGrid = []
    let currentX = 0
    let currentY = 0
    let color = ''
    let piece = ''
    while (currentX < x) {
        if (color == 'white') {
            color = '#061fab'
        } else {
            color = 'white'
        }
        while (currentY < y) {
            if (color == 'white') {
                color = '#061fab'
            } else {
                color = 'white'
            }
            switch (currentX) {

                case 7:
                    switch (currentY) {
                        case 0:
                            piece = 'rook'
                            break;
                        case 7:
                            piece = 'rook'
                            break;
                            case 1:
                                piece = 'knight'
                                break;
                                case 6:
                            piece = 'knight'
                            break;
                            case 2:
                            piece = 'bishop'
                            break;
                            case 5:
                            piece = 'bishop'
                            break;
                            case 4:
                            piece = 'king'
                            break;
                            case 3:
                            piece = 'queen'
                            break;

                        default:
                            break;
                    }
                    break;
                
                    case 0:
                        switch (currentY) {
                            case 0:
                                piece = 'rook'
                                break;
                            case 7:
                                piece = 'rook'
                                break;
                                case 1:
                                    piece = 'knight'
                                    break;
                                    case 6:
                                piece = 'knight'
                                break;
                                case 2:
                                piece = 'bishop'
                                break;
                                case 5:
                                piece = 'bishop'
                                break;
                                case 4:
                                piece = 'queen'
                                break;
                                case 3:
                                piece = 'king'
                                break;
    
                            default:
                                break;
                        }
                        break;

                case 6:
                    piece = 'pawn'
                    break;

                case 1:
                    piece = 'pawn'
                    break;

                default:
                    piece = 'empty'
                    break;
            }

            outputGrid.push({ x: currentX, y: currentY, color: color, piece: piece })
            currentY++;
        }

        currentX++;
        currentY = 0;
    }
    return outputGrid
}