import Header from "./Header";
import { Box, ThemeProvider } from "@mui/material"
import { useSelector } from "react-redux";
import { themeMap } from "../Themes";





function PageBase(props) {

    const userState = useSelector(state => state.user)
    

    return (

        
            <Box>
                <ThemeProvider theme={themeMap[userState.uiColors]}>
                <Header />
                {props.children}
                </ThemeProvider>
            </Box>

    );

}

export default PageBase;