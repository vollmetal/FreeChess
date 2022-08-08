import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameReducer";


export default configureStore({
    reducer: {
        game: gameReducer
    }
})