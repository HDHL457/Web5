const express = require('express');
const controller = require('./users.controller.js');
var composable_middleware = require('composable-middleware');
var auth = require('./auth.service.js');

var router = express.Router();

router.get('/' , auth.authentication, controller.getUrself);

router.post('/signup', controller.signUp);

router.get('/:username', controller.getOneUser);

router.put('/:username', composable_middleware()
.use(auth.authentication)
.use(auth.hasRole('user')), controller.editInfo);

router.delete('/:username', composable_middleware()
.use(auth.authentication)
.use(auth.hasRole('admin')), controller.banUser);

router.post('/login' , controller.logIn);

module.exports = router;
