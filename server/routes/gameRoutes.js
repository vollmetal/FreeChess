const express = require('express');
const gameRouter = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authentication');
const Post = require('../schemas/posts');

gameRouter.get('/', (req, res) => {

})

gameRouter.post ('new', (req, res) => {

})

gameRouter.post ('/move', (req, res) => {
    
})


module.exports = gameRouter;