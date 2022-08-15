import { createSlice } from '@reduxjs/toolkit';


export const gameReducer = createSlice ({
    name: 'Game',
    initialState: {
        id: "",
        name: "placeholder",
        playerTurn: 1,
        clientPlayer: 0,
        players: [{
            id: '',
            score: 0
        }, {
            id: '',
            score: 0
        }],
        gameBoard: ['this'],
        gamePieces: [],
        movePiece: 0,
        spaceModifiers: [],
        gameState: ''
    },
    reducers: {
        setNewGame: (state, action) => {
                  state.gameBoard = action.payload.gameBoard
                  state.gamePieces = action.payload.gamePieces
                  state.players = action.payload.players
                  state.clientPlayer = action.payload.clientPlayer
                  state.gameState = 'waiting'
                  state.name = action.payload.name
                  state.id = action.payload.id
                  state.playerTurn = action.payload.turn
        },

        moveStart: (state, action) => {
            state.spaceModifiers = action.payload.emptySpaces
            state.gamePieces = action.payload.captureSpaces
            state.movePiece = action.payload.id
            state.gameState = 'clientMoving'
        },

        moveCancel: (state) => {
            state.spaceModifiers = []
            state.movePiece = 0
            state.gamePieces = state.gamePieces.map(piece => {
                return {position: piece.position, piece: piece.piece, player: piece.player, capture: false}
            })
            state.gameState = 'clientWaiting'
        },

        moveFinish: (state, action) => {
            
            console.log(state.gamePieces)
            state.gamePieces = action.payload
            state.movePiece = 0
            state.spaceModifiers = []
            if(state.playerTurn === 1) {
                state.playerTurn = 2
            } else {
                state.playerTurn = 1
            }
            state.gameState = 'otherPlayerTurn'
        },

        setClientPlayer: (state, action) => {
            if(state.players[0].id === action.payload.id) {
                state.players[0].clientPlayer = true
            } else if(state.players[1].id === action.payload.id) {
                state.players[1].clientPlayer = true
            }
        }
    }
})

export const { setNewGame, moveStart, moveCancel, moveFinish, makePiece, setClientPlayer } = gameReducer.actions;

export default gameReducer.reducer;