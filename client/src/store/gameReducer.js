import { createSlice } from '@reduxjs/toolkit';
import { GridSetup } from '../constants';


export const gameReducer = createSlice ({
    name: 'Game',
    initialState: {
        id: "",
        name: "placeholder",
        playerIds: {player1: '', player2: ''},
        gamespace: ['this']
    },
    reducers: {
        setNewGame: (state, action) => {
                  state.gamespace = action.payload

        },

        makePiece: (state, action) => {
            state.gamespace[action.payload.position].piece = action.payload.piece
            console.log(state.gamespace[action.payload.position].piece)
        }
    }
})

export const { setNewGame, makePiece } = gameReducer.actions;

export default gameReducer.reducer;