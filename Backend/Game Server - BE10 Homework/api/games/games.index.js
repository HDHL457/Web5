const express = require('express');
const controller = require('./games.controller.js');

var router = express.Router();

router.get('/:name' , controller.getHighScores);
module.exports = router;
