import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSquareIndexFromCoords } from "../../../boardManagement"
import { imagePath, piecePath, SERVER_PATH } from "../../../constants"
import movePosition from "../../../Game Functions/MovePosition"
import { moveCancel, moveFinish, moveStart } from "../../../store/gameReducer"




const Knight = (props) => {

    const gameState = useSelector(state => state.game)
    const userState = useSelector(state => state.user)

    const [load, setLoad] = useState(false)
    const [moves, setMoves] = useState({
        moveSpaces: [],
        captureSpaces: [],
        canCapture: false,
        canMove: false
    })
    const dispatch = useDispatch()

    useEffect(() => {
        movePiece()

    }, [load])

    const startMove = () => {

        if( gameState.gameState == 'clientMoving') {
            dispatch(moveCancel())
        }
        if( gameState.movePiece == props.id) {

        } else {
            dispatch(moveStart({emptySpaces: moves.moveSpaces, captureSpaces: moves.captureSpaces, id: props.id}))
        }
    }

    const movePiece = () => {
        let moveSpaces = []
        let captureSpaces = gameState.gamePieces.map(piece => {
            return piece
        })
        let tempSpace = {}
        let spaceX = 1
        let spaceY = 1
        let capture = false
        let canMove = false

        tempSpace = movePosition((2 + gameState.gamePieces[props.id].position.x), (1 + gameState.gamePieces[props.id].position.y), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
        if(tempSpace.catch) {
            if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
                capture = true
            }
        } else {
            if(tempSpace.space) {
                moveSpaces.push(tempSpace.space)
            }
        }
        tempSpace = movePosition((2 + gameState.gamePieces[props.id].position.x), (gameState.gamePieces[props.id].position.y - 1), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
        if(tempSpace.catch) {
            if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
                capture = true
            }
        } else {
            if(tempSpace.space) {
                moveSpaces.push(tempSpace.space)
            }
        }

        tempSpace = movePosition((gameState.gamePieces[props.id].position.x - 2), (1 + gameState.gamePieces[props.id].position.y), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
        if(tempSpace.catch) {
            if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
                capture = true
            }
        } else {
            if(tempSpace.space) {
                moveSpaces.push(tempSpace.space)
            }
        }
        tempSpace = movePosition((gameState.gamePieces[props.id].position.x - 2), (gameState.gamePieces[props.id].position.y - 1), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
        if(tempSpace.catch) {
            if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
                capture = true
            }
        } else {
            if(tempSpace.space) {
                moveSpaces.push(tempSpace.space)
            }
        }


        tempSpace = movePosition((1 + gameState.gamePieces[props.id].position.x), (2 + gameState.gamePieces[props.id].position.y), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
        if(tempSpace.catch) {
            if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
                capture = true
            }
        } else {
            if(tempSpace.space) {
                moveSpaces.push(tempSpace.space)
            }
        }
        tempSpace = movePosition((gameState.gamePieces[props.id].position.x - 1), (2 + gameState.gamePieces[props.id].position.y), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
        if(tempSpace.catch) {
            if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
                capture = true
            }
        } else {
            if(tempSpace.space) {
                moveSpaces.push(tempSpace.space)
            }
        }

        tempSpace = movePosition((1 + gameState.gamePieces[props.id].position.x), (gameState.gamePieces[props.id].position.y - 2), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
        if(tempSpace.catch) {
            if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
                capture = true
            }
        } else {
            if(tempSpace.space) {
                moveSpaces.push(tempSpace.space)
            }
        }
        tempSpace = movePosition((gameState.gamePieces[props.id].position.x - 1), (gameState.gamePieces[props.id].position.y - 2), gameState.gameBoard, gameState.gamePieces, props.id, props.player)
        if(tempSpace.catch) {
            if(tempSpace.space) {
                captureSpaces[tempSpace.space.targetPiece] = { position: gameState.gamePieces[tempSpace.space.targetPiece].position, piece: gameState.gamePieces[tempSpace.space.targetPiece].piece, player: gameState.gamePieces[tempSpace.space.targetPiece].player, capture: true }
                capture = true
            }
        } else {
            if(tempSpace.space) {
                moveSpaces.push(tempSpace.space)
            }
        }

        if(moveSpaces) {
            if(moveSpaces.length > 0 || capture) {
                canMove = true
            }
        }
        setMoves({
            ...moves,
            moveSpaces: moveSpaces,
            captureSpaces: captureSpaces,
            canCapture: capture,
            canMove: canMove
        })
        
    }

    const capturePiece = async () => {
        const position = gameState.gamePieces[props.id].position
        const oldPosition = gameState.gamePieces[gameState.movePiece].position
        let filteredPieces = await gameState.gamePieces.filter(piece => {
            return (piece.position != position)
        })


        console.log(getSquareIndexFromCoords(oldPosition, filteredPieces))
        filteredPieces[getSquareIndexFromCoords(oldPosition, filteredPieces)] = {position: position, piece: filteredPieces[getSquareIndexFromCoords(oldPosition, filteredPieces)].piece, player: filteredPieces[getSquareIndexFromCoords(oldPosition, filteredPieces)].player, capture: false}
        console.log(filteredPieces)
        dispatch(moveFinish(filteredPieces))
        console.log(gameState.gamePieces)
        
        const result = await fetch(`${SERVER_PATH}/game/move/${gameState.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({move: filteredPieces})
        })
        const sanitizedResult = await result.json()
        console.log(sanitizedResult)
    }

    return (<Box sx={{height: '100%', width: '100%'}}>
        {props.player != gameState.clientPlayer && props.capture ? <Button sx={{borderStyle: 'solid', borderColor: 'red', borderWidth: '4px', height: '100%', width: '100%', padding: '0px'}} onClick={capturePiece}>
        <Box sx={{height: '100%', width: '100%'}} component="img"
           alt="placeholder"
           src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Knight.png`}/>
         </Button>: props.player == gameState.clientPlayer && gameState.playerTurn == props.player && moves.canMove ? <Button sx={{height: '100%', width: '100%', padding: '0px'}} onClick={startMove}>
    <Box sx={{height: '100%', width: '100%'}} component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Knight.png`}/>
     </Button>: <Box sx={{height: '100%', width: '100%'}}
      component="img"
       alt="placeholder"
       src={`${process.env.PUBLIC_URL}/${imagePath}/${piecePath}/${userState.playerPiece[props.player -1]}/Knight.png`}/>}
       </Box>
        
    )
}

export default Knight