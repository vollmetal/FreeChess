import Header from "./Header";
import { Box } from "@mui/material"
import GamePage from "./GamePage";





const PageBase = () => {

    return (
        <Box>
            <Header/>
            <GamePage/>
        </Box>
        
    )

}

export default PageBase;