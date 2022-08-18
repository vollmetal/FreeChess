import { createSlice, current } from '@reduxjs/toolkit';


export const gameReducer = createSlice ({
    name: 'Game',
    initialState: {
        id: "",
        name: "placeholder",
        playerTurn: 1,
        clientPlayer: 0,
        players: [{
            id: '',
            name: '',
            score: 0
        }, {
            id: '',
            name: '',
            score: 0
        }],
        gameBoard: ['this'],
        piecesUpdated: false,
        render: true,
        gameState: ''
    },
    reducers: {
        setNewGame: (state, action) => {
                  state.gameBoard = action.payload.gameBoard
                  state.players = action.payload.players
                  state.clientPlayer = action.payload.clientPlayer
                  state.gameState = 'waiting'
                  state.name = action.payload.name
                  state.id = action.payload.id
                  state.playerTurn = action.payload.turn
                  state.render = true
        },

        clearGame: (state) => {
        state.id = ""
        state.name = "placeholder"
        state.playerTurn = 1
        state.clientPlayer = 0
        state.players = [{
            id: '',
            name: '',
            score: 0
        }, {
            id: '',
            name: '',
            score: 0
        }]
        state.gameBoard = ['this']
        state.movePieces = []
        state.movePiece = 0
        state.render = true
        state.gameState = ''
        },

        finishRender: (state) => {
            state.render = false
        },

        pieceUpdate: (state, action) => {
            state.gameBoard[action.payload.id].move = action.payload.move
            state.gameBoard[action.payload.id].moves = action.payload.moves
        },

        moveStart: (state, action) => {
            const temp = state.gameBoard[action.payload].moves
            state.gameBoard = state.gameBoard.map(piece => {
                return {position: piece.position, color: piece.color, piece: piece.piece, player: piece.player, move: ''}
            })
            temp.forEach(element => {
                
                state.gameBoard[element.index].move = element.type
                state.gameBoard[element.index].pieceIndex = action.payload
                console.log(state.gameBoard[element.index].move)
            });
            
            state.render = true
        },

        moveCancel: (state) => {
            state.gameBoard = state.gameBoard.map(piece => {
                return {position: piece.position, color: piece.color, piece: piece.piece, player: piece.player, move: ''}
            })
            state.render = true
            state.gameState = 'clientWaiting'
        },

        moveFinish: (state, action) => {
            state.gameBoard[action.payload.spaceId].piece = action.payload.movePiece
            state.gameBoard[action.payload.spaceId].player = state.clientPlayer
            state.gameBoard[action.payload.spaceId].move = ''

            state.gameBoard[action.payload.movePieceId].piece = ''
            state.gameBoard[action.payload.movePieceId].player = 0
            state.gameBoard = state.gameBoard.map(piece => {
                return {position: piece.position, color: piece.color, piece: piece.piece, player: piece.player, move: ''}
            })
            
            state.gameState = 'clientWaiting'
            if(state.playerTurn === 1) {
                state.playerTurn = 2
            } else {
                state.playerTurn = 1
            }
            state.render = true
        },

        setClientPlayer: (state, action) => {
            state.clientPlayer = action.payload
            state.render = true
        }
    }
})

export const { setNewGame, clearGame, moveStart, moveCancel, moveFinish, makePiece, setClientPlayer, pieceUpdate, finishRender } = gameReducer.actions;

export default gameReducer.reducer;