import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameReducer";
import userReducer from "./userReducer";


export default configureStore({
    reducer: {
        game: gameReducer,
        user: userReducer
    }
})