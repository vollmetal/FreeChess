import Header from "./Header";
import { Box, ThemeProvider, useTheme } from "@mui/material"
import { useSelector } from "react-redux";
import { themeMap } from "../Themes";
import Footer from "./Footer";





function PageBase(props) {

    const userState = useSelector(state => state.user)
    const theme = useTheme()
    

    return (

        
            <Box sx={{minHeight: '100vh', backgroundColor: theme.palette.background.default}} >
                <Header />
                {props.children}
                <Footer />
            </Box>

    );

}

export default PageBase;