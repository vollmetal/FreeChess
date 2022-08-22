const mongoose = require('mongoose')


const gameSchema = new mongoose.Schema({
    name: String,
    currentPlayers: Number,
    players: {
        1: {
            uid: String,
            name: String,
            score: Number
        },
        2: {
            uid: String,
            name: String,
            score: Number
        }
    },
    gameBoard: Array,
    playerTurn: Number
})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;