const express = require('express');
var controller = require('./posts.controller.js');
var commentController = require('../comments/comments.controller.js');
var composable_middleware = require('composable-middleware');
var auth = require('../users/auth.service.js');
var post = require('./posts.model.js');

var router = express.Router();
//Get 15 posts at a time
router.get('/newsfeed/:page?' , controller.getNewsfeed);
//Create new post
router.post('/create' , controller.createPost);
//Get a post by id
router.get('/:postId',auth.authentication, controller.getOne);
//Edit a post
router.put('/:postId', composable_middleware()
.use(auth.authentication)
.use(auth.hasPermissionWithPost), controller.editOne);
//Delete a post
router.delete('/:postId' , composable_middleware()
.use(auth.authentication)
.use(auth.hasPermissionWithPost), controller.deleteOne);
//Show likes of a post
router.get('/:postId/likes' , composable_middleware()
.use(auth.authentication), controller.showLikes);
//Like post
router.post('/:postId/like' , composable_middleware()
.use(auth.authentication), controller.likePost);
//Unlike post
router.post('/:postId/unlike' , composable_middleware()
.use(auth.authentication), controller.unlikePost);
//Show comments of a post
router.get('/:postId/comments' , composable_middleware()
.use(auth.authentication), commentController.getAllComment);
//create a new comment
router.post('/:postId/comments/create', composable_middleware()
.use(auth.authentication), commentController.createComment);
//show 1 comment based on comment ID
router.get('/:postId/comments/:commentId', composable_middleware()
.use(auth.authentication) , commentController.getOneComment);
//Edit a comment
router.put('/:postId/comments/:commentId', composable_middleware()
.use(auth.authentication)
.use(auth.hasPermissionWithComment), commentController.editOneComment);
//Delete a comment
router.delete('/comments/:commentId', composable_middleware()
.use(auth.authentication)
.use(auth.hasPermissionWithComment), commentController.deleteOneComment);

module.exports = router;
