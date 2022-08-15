import Header from "./Header";
import { Box } from "@mui/material"





function PageBase(props) {

    return (
        <Box>
            <Header />
            {props.children}
        </Box>

    );

}

export default PageBase;