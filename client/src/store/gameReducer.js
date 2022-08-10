import { createSlice } from '@reduxjs/toolkit';
import { GridSetup } from '../constants';


export const gameReducer = createSlice ({
    name: 'Game',
    initialState: {
        id: "",
        name: "placeholder",
        clientPlayer: 1,
        playerIds: {player1: '', player2: ''},
        gameBoard: ['this'],
        gamePieces: [],
        spaceModifiers: [],
        gameState: ''
    },
    reducers: {
        setNewGame: (state, action) => {
                  state.gameBoard = action.payload.gameBoard
                  state.gamePieces = action.payload.gamePieces
        },

        moveStart: (state, action) => {
            state.spaceModifiers = action.payload
            state.gameState = 'clientMoving'
        },

        moveCancel: (state) => {
            state.spaceModifiers = []
            state.gameState = 'clientWaiting'
        },

        moveFinish: (state, action) => {
            state.gamePieces[action.payload.movedPiece].position = action.payload.newPosition
            state.spaceModifiers = []
            state.gameState = 'otherPlayerTurn'
        }
    }
})

export const { setNewGame, moveStart, moveCancel, moveFinish, makePiece } = gameReducer.actions;

export default gameReducer.reducer;