const express = require('express');
const controller = require('./instructors.controller.js');

var router = express.Router();
router.get('/' , controller.getAll);
router.post('/' , controller.create);
router.get('/:name', controller.getOne);
router.put('/:name' , controller.updateOne);
router.delete('/:name' , controller.deleteOne);

module.exports = router;
