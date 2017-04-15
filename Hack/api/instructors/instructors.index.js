const express = require('express');
const controller = require('./instructors.controller.js');
var composable_middleware = require('composable-middleware');
var auth = require('../users/auth.service.js');

var router = express.Router();

router.get('/' , controller.getAll);

router.post('/' , composable_middleware()
.use(auth.authentication)
.use(auth.hasRole('user'))
.use(auth.hasPermission('instructor' , 'create')),
 controller.create);

router.get('/:name', controller.getOne);

router.put('/:name' , composable_middleware()
.use(auth.authentication)
.use(auth.hasRole('user'))
.use(auth.hasPermission('instructor' , 'edit')), controller.updateOne);

router.delete('/:name' , composable_middleware()
.use(auth.authentication)
.use(auth.hasRole('admin'))
.use(auth.hasPermission('instructor' , 'delete')), controller.deleteOne);

module.exports = router;
