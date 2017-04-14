const express = require('express');
const controller = require('./users.controller.js');

var router = express.Router();

//Get information of an user by id, using regex for multiple endpoints after /:userId
router.get('/:userId/:var(score|username)?' , controller.getOne);

//Update an user's score by id
router.put('/:userId/score', controller.updateScore);

//Update an user's username by id
router.put('/:userId/username' , controller.updateUsername);

//Create a new user
router.post('/' , controller.create);

module.exports = router;
