const express = require('express');
const userRouter = express.Router();
const Connection = require('../schemas/connections');


userRouter.get('/', (req, res) => {

})

userRouter.post('/register', (req, res) => {
    const info = req.body
    if (info) {
        const newUser = new Connection({
            name: info.name,
            userId: info.userId,
            socketId: '',
            player1Pieces: 'White',
            player2Pieces: 'Black',
            boardColors: ['white', 'black'],
            themeColors: 'Basic'
        })
        newUser.save(error => {
            if (error) {
                res.json({ success: false, message: error, currentData: info })
            } else {
                res.json({ success: true, message: `User successfully registered!`})
            }
        })
    }
})

userRouter.post('/update/:userId', async (req, res) => {
    const changedValues = req.body
    try {
        const user = await Connection.findOne({userId: req.params.userId})
        const result = await user.updateOne({
            player1Pieces: changedValues.pieces[0],
            player2Pieces: changedValues.pieces[1],
            boardColors: changedValues.boardColors,
            themeColors: changedValues.theme
        })
        res.json({success: true, message: 'user updated!', data: result})
    } catch {
        res.json({success:false , message: 'failed to update user!'})
    }
})

userRouter.get('/getuser/:userId', async (req, res) => {
    try {
        const user = await Connection.findOne({userId: req.params.userId})
        res.json({success: true, message: 'user found!', data: user})
    } catch {
        res.json({success:false , message: 'cannot find user!'})
    }
    
})

module.exports = userRouter;