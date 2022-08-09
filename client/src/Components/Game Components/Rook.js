import { Box, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { selectPiece } from "../../store/gameReducer"




const Rook = (props) => {

    const gameState = useSelector(state => state.game)
    const dispatch = useDispatch()

    const drawMoves = () => {
        const potentialSpaces = []
        
        for (let index = props.position.x; index < 7; index++) {
            const element = gameState.gamespace.filter(piece => {
                return piece.x == index
            })
            dispatch(selectPiece({piece: props, moves: element}))
            
        }
    }

    return (
        <Button
        
        onClick={drawMoves}
      >
        <Box component="img"
        alt="placeholder"
        src={process.env.PUBLIC_URL+"imgs/piece icons/b_Rook.png"}/>
      </Button>
    )
}

export default Rook