import { createSlice } from '@reduxjs/toolkit';


export const userReducer = createSlice({
    name: 'User',
    initialState: {
        email: '',
        username: '',
        photoURL: '',
        playerPiece: ['white', 'black'],
        uiColors: ''
    },
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email
            state.username = action.payload.displayName
            state.photoURL = action.payload.photoURL
            state.playerPiece = action.payload.playerPiece
            state.uiColors = action.payload.uiColors
        },

        logoutUser: (state) => {
            state.email = ''
            state.username = ''
            state.photoURL = ''
            state.playerPiece = ['white', 'black']
            state.uiColors = ''
        }
    }
})

export const { login, logoutUser } = userReducer.actions;

export default userReducer.reducer;