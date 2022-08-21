import { ThemeProvider } from "@mui/material";
import { themeMap } from "../Themes";

const { useSelector } = require("react-redux")




const ThemeBase = (props) => {
    const userState = useSelector(state => state.user)

    return (
        <ThemeProvider theme={themeMap[userState.uiColors]}>
            {props.children}
        </ThemeProvider>
    )
}

export default ThemeBase;