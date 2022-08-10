import { Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { moveFinish } from "../../store/gameReducer"




const ValidMove = (props) => {

    const dispatch = useDispatch()

    const movePiece = () => {
        dispatch(moveFinish({movedPiece: props.movePiece, newPosition: props.position}))
    }

    return (
        <Button sx={{borderStyle: 'solid', borderColor: 'green'}} onClick={movePiece}>VALID</Button>
    )
}

export default ValidMove