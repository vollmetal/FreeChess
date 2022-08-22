import { createSlice } from '@reduxjs/toolkit';


export const userReducer = createSlice({
    name: 'User',
    initialState: {
        email: '',
        username: '',
        photoURL: '',
        playerPiece: ['White', 'Black'],
        boardColors: ['white', 'black'],
        uiColors: 'Basic'
    },
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email
            state.username = action.payload.displayName
            state.photoURL = action.payload.photoURL
            state.playerPiece = action.payload.playerPiece
            state.boardColors = action.payload.boardColors
            state.uiColors = action.payload.uiColors
        },

        logoutUser: (state) => {
            state.email = ''
            state.username = ''
            state.photoURL = ''
            state.playerPiece = ['White', 'Black']
            state.uiColors = 'Basic'
        },

        setplayerPieces: (state, action) => {
            state.playerPiece = action.payload.pieces
        },

        setBoardColor: (state, action) => {
            state.boardColors = action.payload.color
        }
    }
})

export const { login, logoutUser, setplayerPieces, setBoardColor } = userReducer.actions;

export default userReducer.reducer;