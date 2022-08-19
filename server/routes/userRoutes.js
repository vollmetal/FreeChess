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

userRouter.get('/getuser/:userId', async (req, res) => {
    try {
        console.log(req.params.userId)
        const user = await Connection.findOne({userId: req.params.userId})
        console.log(user)
        res.json({success: true, message: 'user found!', data: user})
    } catch {
        res.json({success:false , message: 'cannot find user!'})
    }
    
})

module.exports = userRouter;