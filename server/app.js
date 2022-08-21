const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http');
const server = http.createServer(app);
global.mongoose = require('mongoose')
global.bcrypt = require('bcryptjs')
const { Server } = require("socket.io");
global.io = new Server(server, {
  cors: {
    origin: "*"
  }
});

global.socketInfo = {}

io.use(express.json())
io.use(cors())

require('dotenv').config()

const PORT = process.env.PORT || 8080

const userRoutes = require('./routes/userRoutes')
io.use('/user', userRoutes)

const gameRoutes = require('./routes/gameRoutes')
io.use('/game', gameRoutes)


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.w1ytim4.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true, useUnifiedTopology: true
},
  (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Successfully connected to MongoDB Database')
    }
  })
  io.listen(PORT, () => {
    console.log(`server listening on port ${PORT}!`)
})