import { Button } from "@mui/material"
import { Box } from "@mui/system"
import Pawn from "./Pawn"



const BoardSpace = (props) => {


    const pieceClicked = () => {
        console.log(props)
    }
    

    return (
        <Button sx={{width: '100%', height: '100%'}} onClick={pieceClicked}>
            {props.piece == 'pawn' ? <Pawn position={props.spaceCoordinates}/>: null}
        </Button>
    )
}

export default BoardSpace