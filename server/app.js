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

const PORT = process.env.PORT || 8080

global.socketInfo = {}


server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}!`)
})

app.use(express.json())
app.use(cors())

require('dotenv').config()



const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)

const gameRoutes = require('./routes/gameRoutes')
app.use('/game', gameRoutes)


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
