import { createSlice } from '@reduxjs/toolkit';


export const userReducer = createSlice ({
    name: 'User',
    initialState: {
        email: '',
        username: '',
        photoURL: '',
        playerPiece: ['white', 'black']
    },
    reducers: {
        login: (state, action) => {
                  state.email = action.payload.email
                  state.username = action.payload.displayName
                  state.photoURL = action.payload.photoURL
        }
    }
})

export const { login } = userReducer.actions;

export default userReducer.reducer;