const express = require('express');
const controller = require('./users.controller.js');

var router = express.Router();
router.get('/' , controller.getAll);
router.post('/' , controller.create);
router.get('/:username' , controller.getOne);
router.put('/:username', controller.updateOne);
router.delete('/:username', controller.deleteOne);

module.exports = router;
