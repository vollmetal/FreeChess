import Header from "./Header";
import { Box } from "@mui/material"
import { useEffect } from "react";
import { auth, provider } from "../firestore";
import { useAuthState } from "react-firebase-hooks/auth";





function PageBase(props) {

    return (
        <Box>
            <Header />
            {props.children}
        </Box>

    );

}

export default PageBase;