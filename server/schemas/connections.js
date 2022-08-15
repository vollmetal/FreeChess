const mongoose = require('mongoose')


const connectionSchema =  new mongoose.Schema({
    name: String,
    userId: String,
    socketId: String
})

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;