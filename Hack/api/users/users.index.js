const express = require('express');
const controller = require('./users.controller.js');
var composable_middleware = require('composable-middleware');
var auth = require('./auth.service.js');

var router = express.Router();

router.get('/' , controller.getAll);

router.post('/' , composable_middleware()
.use(auth.authentication)
.use(auth.hasRole('user'))
.use(auth.hasPermission('user','create')) , controller.create);

router.get('/:username' , controller.getOne);

router.put('/:username', composable_middleware()
.use(auth.authentication)
.use(auth.hasRole('user'))
.use(auth.hasPermission('user' , 'edit')), controller.updateOne);

router.delete('/:username', composable_middleware()
.use(auth.authentication)
.use(auth.hasRole('admin'))
.use(auth.hasPermission('user' , 'delete')), controller.deleteOne);

router.post('/login' , controller.logIn);

module.exports = router;
