import { Card } from "@mui/material";
import { Box } from "@mui/system";
import GamePage from "./Game Components/GamePage";




const GameLobby = () => {

    return (
        <Box>
            <Card sx={{padding: '20px'}}>
                <GamePage />
            </Card>
        </Box>
    )

}

export default GameLobby;