const express = require('express');
const gameRouter = express.Router();
const Game = require('../schemas/game');

gameRouter.get('/', (req, res) => {

})

gameRouter.post('/new', async (req, res) => {
    const gameInfo = req.body

    if (gameInfo) {
        const newGame = Game({
            name: gameInfo.gameName,
            currentPlayers: 0,
            players: gameInfo.players,
            boardPieces: gameInfo.boardPieces,
            playerTurn: 1

        })
        newGame.save((error) => {
            if (error) {
                res.json({ success: false, message: error, currentData: gameInfo })
            } else {
                res.json({ success: true, message: `Game ${gameInfo.gameName} successfully made!` })
            }
        })
    } else {
        req.json({ success: false, message: "ERROR: Game info not found!" })
    }
})

gameRouter.get('/findall', async (req, res) => {
    try {
        const games = await Game.find()
        res.json({ success: true, gameList: games })
    } catch {
        res.json({ success: false, message: 'ERROR: failed to fetch game list!' })
    }


})

gameRouter.get('/join/:gameId', async (req, res) => {
    const gameId = req.params.gameId
    let openSides = []

    try {
        const game = await Game.findById(gameId)
        if (game.currentPlayers < 2) {
            if (game.players[1].uid != '') {
                openSides.push(false)
            } else {
                openSides.push(true)
            }
            if (game.players[2].uid != '') {
                openSides.push(false)
            } else {
                openSides.push(true)
            }
            res.json({ success: true, message: `Welcome to ${game.name}! Please choose which side you want to be on!`, openSlots: openSides })
        }
    } catch {
        res.json({ success: false, message: 'ERROR: failed to fetch game info!', currentData: gameId })
    }
})

gameRouter.post('/lobby/joinSide/:gameId', async (req, res) => {
    const gameId = req.params.gameId
    const playerInfo = req.body
    let joinedSide = ''

    try {
        const game = await Game.findById(gameId)
        if (game.currentPlayers < 2) {
            if (playerInfo.side == 1) {
                const updateGame = await game.updateOne({
                    players: {
                        1: {
                            uid: playerInfo.uid,
                            name: playerInfo.name,
                            score: game.players[1].score
                        },
                        2: {
                            uid: game.players[2].uid,
                            name: game.players[2].name,
                            score: game.players[2].score
                        }
                    },
                    currentPlayers: game.currentPlayers++
                })
                joinedSide = 'player 1'
            } else {
                const updateGame = await game.updateOne({
                    players: {
                        1: {
                            uid: game.players[1].uid,
                            name: game.players[1].name,
                            score: game.players[1].score
                        },
                        2: {
                            uid: playerInfo.uid,
                            name: playerInfo.name,
                            score: game.players[2].score
                        }
                    },
                    currentPlayers: game.currentPlayers++
                })
                joinedSide = 'player 2'
            }

            res.json({ success: true, message: `You have joined as ${joinedSide}!` })
        }
    } catch {
        res.json({ success: false, message: 'ERROR: failed to fetch game info!', currentData: gameId })
    }
})

gameRouter.get('/loadGame/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    try {
        const game = await Game.findById(gameId)
        res.json({ success: true, gameInfo: game })
    } catch {
        res.json({ success: false, message: 'ERROR: failed to fetch game info!', currentData: gameId })
    }
})

gameRouter.post('/move/:gameId', async (req, res) => {
    const move = req.body.move;
    let newTurn = 0
    try {
        const game = await Game.findById(req.params.gameId)
        try {
            console.log(move)
            
            if (game.playerTurn == 1) {
                console.log('turn 2')
                newTurn = 2
            } else {
                newTurn = 1
            }
            
            const updatedGame = await game.updateOne({
                boardPieces: move,
                playerTurn: newTurn
            })
            res.json({ success: true, message: 'move successfully made!', currentData: updatedGame})
        } catch {
            res.json({ success: false, message: 'ERROR: failed to fetch game info 2!', currentData: req.body.move })
        }
    } catch {
        res.json({ success: false, message: 'ERROR: failed to fetch game info!', currentData: req.body.move })
    }
})


module.exports = gameRouter;