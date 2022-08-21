const express = require('express');
const Connection = require('../schemas/connections');
const gameRouter = express.Router();
const Game = require('../schemas/game');


gameRouter.get('/', (req, res) => {

})

io.on('connection', async (socket) => {
    console.log('connected!')
    
    socket.on('joinRoom', (args) => {
        socket.leave('listRoom')
        socket.join(`room - ${args.roomId}`)
        console.log(socket.rooms)
    })

    socket.on('login', (uid) => {
        const user = Connection.findOne({userId: uid})
        
    })

    socket.on("disconnecting", () => {
            
            console.log('disconnecting')
      });
    
      

    socket.on('listRoomJoin', (args) => {
        console.log('joined the room showing list of lobbies!')
        socket.join('listRoom')
        socket.emit('listRoomJoined', 'handshake successful')
    })
    socket.on('leaveRooms', async (args) => {
        socket.leave('listRoom')
        if(args) {
            
            if(args.gameId) {
                io.to(`room - ${args.gameId}`).emit('userLeft')
                socket.leave(`room - ${args.gameId}`)
                const game = await Game.findById(args.gameId)
                if(args.playerSide) {
                    let players = ''
                    let currentPlayers = game.currentPlayers
                    switch (args.playerSide) {
                        case 1:
                           players = {
                                1: {
                                    uid: '',
                                    name: '',
                                    score: game.players[1].score
                                },
                                2: {
                                    uid: game.players[2].uid,
                                    name: game.players[2].name,
                                    score: game.players[2].score
                                }
                            }
                            currentPlayers = game.currentPlayers--                            
                            break;

                            case 2:
                                players = {
                                    1: {
                                        uid: game.players[1].uid,
                                        name: game.players[1].name,
                                        score: game.players[1].score
                                    },
                                    2: {
                                        uid: '',
                                        name: '',
                                        score: game.players[2].score
                                    }
                                }
                                currentPlayers = game.currentPlayers--
                                break;                    
                        default:
                            break;
                    }
                    
                    const updateGame = await game.updateOne({
                        players: players,
                        currentPlayers: currentPlayers
                    })
                    
                }
            }
            

        }
        
    })
    
})

gameRouter.post('/new', async (req, res) => {
    const gameInfo = req.body

    if (gameInfo) {
        const newGame = Game({
            name: gameInfo.gameName,
            currentPlayers: 0,
            players: gameInfo.players,
            gameBoard: gameInfo.gameBoard,
            playerTurn: 1

        })
        newGame.save((error) => {
            if (error) {
                res.json({ success: false, message: error, currentData: gameInfo })
            } else {
                io.to(`listRoom`).emit('lobbyListUpdate')
                res.json({ success: true, game: newGame, message: `Game ${gameInfo.gameName} successfully made!`,  currentData: gameInfo})
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
            const currentPlayers = game.currentPlayers++            
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
                    currentPlayers: currentPlayers
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
                    currentPlayers: currentPlayers
                })
                joinedSide = 'player 2'
            }

            io.to(`room - ${req.params.gameId}`).emit('userJoin')
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
    const move = req.body;

    let newTurn = 0
    try {
        const game = await Game.findById(req.params.gameId)
        try {
            console.log(game.playerTurn)
            
            if (game.playerTurn == 1) {
                
                newTurn = 2
            } else {
                newTurn = 1
            }
            console.log(newTurn)            
            const gameUpdate = await game.updateOne({
                gameBoard: move,
                playerTurn: newTurn
            })
            io.to(`room - ${req.params.gameId}`).emit('updateRoom')
            res.json({ success: true, message: 'move successfully made!', currentData: gameUpdate})
        } catch {
            res.json({ success: false, message: 'ERROR: failed to fetch game info 2!', currentData: req.body.move })
        }
    } catch {
        res.json({ success: false, message: 'ERROR: failed to fetch game info!', currentData: req.body.move })
    }
})


module.exports = gameRouter;