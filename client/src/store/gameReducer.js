import { createSlice } from '@reduxjs/toolkit';
import { GridSetup } from '../constants';


export const gameReducer = createSlice ({
    name: 'Game',
    initialState: {
        id: "",
        name: "placeholder",
        playerTurn: 1,
        players: [{
            id: '',
            score: 0,
            clientPlayer: false
        }, {
            id: '',
            score: 0,
            clientPlayer: false
        }],
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
        },

        setClientPlayer: (state, action) => {
            if(state.players[0].id == action.payload.id) {
                state.players[0].clientPlayer = true
            } else if(state.players[1].id == action.payload.id) {
                state.players[1].clientPlayer = true
            }
        }
    }
})

export const { setNewGame, moveStart, moveCancel, moveFinish, makePiece, setClientPlayer } = gameReducer.actions;

export default gameReducer.reducer;