
export const imagePath = 'imgs'

export const piecePath = 'piece icons'

export const blackPieceImgPath = 'black'

export const SERVER_PATH = 'https://freechess.herokuapp.com'

export const SERVER_PORT = ':50612'

export const SOCKET_PORT = ':8080'

export const GridSetup = (x, y) => {
    let outputGrid = []
    let currentX = 1
    let currentY = 1
    let color = ''
    let player = 1
    let piece = ''
    
    while (currentX < x) {
        if (color == 0) {
            color = 1
        } else {
            color = 0
        }
        
        while (currentY < y) {
            let player = 1
            let piece = ''
            if (currentY == 1 || currentY == 2) {
                player = 1
            } else {
                player = 2
            }
            if (color == 0) {
                color = 1
            } else {
                color = 0
            }
            switch (currentY) {
                case 1:
                    switch (currentX) {
                        case 1:
                            piece = 'Rook'
                            break;
                        case 8:
                            piece = 'Rook'
                            break;
                        case 2:
                            piece = 'Knight'
                            break;
                        case 7:
                            piece = 'Knight'
                            break;
                        case 3:
                            piece = 'Bishop'
                            break;
                        case 6:
                            piece = 'Bishop'
                            break;
                        case 4:
                            piece = 'Queen'
                            break;
                        case 5:
                            piece = 'King'
                            break;
                        default:
                            break;
                    }

                    break;
                case y-1:
                    switch (currentX) {
                        case 1:
                            piece = 'Rook'
                            break;
                        case 8:
                            piece = 'Rook'
                            break;
                        case 2:
                            piece = 'Knight'
                            break;
                        case 7:
                            piece = 'Knight'
                            break;
                        case 3:
                            piece = 'Bishop'
                            break;
                        case 6:
                            piece = 'Bishop'
                            break;
                        case 4:
                            piece = 'Queen'
                            break;
                        case 5:
                            piece = 'King'
                            break;
                        default:
                            break;
                    }

                    break;

                case 2:
                    piece = 'Pawn'
                    break;
                case y - 2:
                    piece = 'Pawn'
                    break;

                default:
                    break;
            }

            outputGrid.push({ position: { x: currentX, y: currentY }, color: color, piece: piece, player: player, canMove: false, move: ''  })
            currentY++;
        }

        currentX++;
        currentY = 1;
    }
    return outputGrid
}