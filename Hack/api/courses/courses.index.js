const express = require('express');
const controller = require('./courses.controller.js');
var composable_middleware = require('composable-middleware');
var auth = require('../users/auth.service.js');

var router = express.Router();
router.get('/' , controller.getAll);

router.post('/' , composable_middleware()
.use(auth.authentication)
.use(auth.hasRole('user'))
.use(auth.hasPermission('course' , 'create')) , controller.create);

router.get('/:name', controller.getOne);

router.put('/:name', composable_middleware()
.use(auth.authentication)
.use(auth.hasPermission('course', 'edit')), controller.updateOne);

router.delete('/:name' , composable_middleware()
.use(auth.authentication)
.use(auth.hasPermission('course', 'delete')), controller.deleteOne);

module.exports = router;
