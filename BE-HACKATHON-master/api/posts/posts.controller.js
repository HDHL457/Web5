var post = require('./posts.model.js');
var comment = require('../comments/comments.model.js');
var user = require('../users/users.model.js');
var jwt = require('jsonwebtoken');
var configs = require('../../configs/configs.js');


module.exports = {
  getNewsfeed : function(req, res){
    if(req.params.page)
      var page = req.params.page;
    else var page = 0;
    post.find({isDeleted : false})
        .sort({createdAt : -1})
        .limit(configs.numberOfPostsDisplay)
        .skip(page*10)
        // .populate({
        //   path: 'author',
        //   select: '_id username avatar'
        // })
        // .populate('_likedBy')
        // .populate('_comments')
        .exec(function(err, data){
          if(err) res.json({status : false , message : err.message});
          else {
              res.json({status: true, result: data});
          }
        })
  },
  editOne : function(req , res){
    post.findOneAndUpdate({_id : req.params.postId, isDeleted : false},
                          {$set : req.body} , {upsert : true})
          .then(function(){
            res.json({status : true, message : "Edit successfully!"});
          })
          .catch(function(err){
            res.json({status : false, message : err.message});
          })
  },
  deleteOne : function(req , res){
    post.findOneAndUpdate({_id : req.params.postId , isDeleted : false},
                          {$set : {isDeleted : true}},
                          {new : true})
          .then(function(data){
            res.json({status : true , message : "Delete successfully!"});
          })
          .catch(function(err){
            res.json({status : false, message : err.message});
          })
  },
  getOne : function(req , res){
    post.findOneAndUpdate({_id : req.params.postId , isDeleted : false},
                          {$inc : {views : 1}},
                          {new : true})
        .populate('author')
        // .populate({
        //   path: '_likedBy',
        //   select: '_id username avatar'
        // })
        .populate('_comments')
        .exec(function (err, data) {
          if(err){
            res.json({status : false , message : err.message});
          }
          else {
            comment.populate(data, {
              path: '_comments.author',
              select: '_id username avatar',
              model: user
            }, function (err, newData) {
              newData.is_like = newData.checkLikeOrNot(req.user._id);
              res.json({status : true , result: newData});
            });
          }
        })
  },
  showLikes : function(req, res){
    post.findOne({_id : req.params.postId , isDeleted : false})
        .then(function(data){
          var likesDisplay = {};
          likesDisplay.numberOfLikes = data._likedBy.length;
          likesDisplay.likedBy = data._likedBy;
          res.json({status : true, result : likesDisplay});
        })
  },
  likePost : function(req, res){
    post.findOneAndUpdate({_id : req.params.postId, isDeleted : false} ,
                          {$addToSet : {_likedBy : req.user._id}},
                          {upsert : true , new : true})
        .then(function(post){
          if(post.checkLikeOrNot(req.user._id)){
            user.findOneAndUpdate({_id : req.user._id} ,
              {$addToSet : {_liked : post._id}},
              {upsert : true, new : true});
            res.json({status: true, message: 'Like Successful'});
          }
          else {
            res.json({status: true, message: 'Bạn đã like rồi'});
          }
        })
        .catch(function(err){
          res.json({status : false, message : err.message});
        })
  },
  unlikePost : function(req, res){
    post.findOneAndUpdate({_id : req.params.postId, isDeleted : false},
                          {$pull : {_likedBy : req.user._id}},
                          {new : true})
        .then(function(data){
          user.findOneAndUpdate({_id : req.user._id},
                                {$pull : {_liked : data._id}})
              .then(function(){
                res.json({status : true, message: 'Unlike successful'});
              })
              .catch(function(err){
                res.json({status : false, message : err.message});
              })
        })
  },
  createPost : function(req, res){
    if(!req.body.title) res.json({status : false, message : "Missing title!"});
    if(!req.body.content) res.json({status : false, message : "Missing content!"});
    if(!req.body.img) res.json({status : false, message : "Missing img!"});
    // if(!req.body.category) res.json({status: false, message : "Missing category!"});
    // var categoryExists = 0;
    // configs.categories.forEach(function(category){
    //   if(category == req.body.category) categoryExists = 1;
    // });
    // if(!categoryExists) res.json({status : false, message : "This category does not exist!"});
    // else {
      var objectCreated = req.body;
      // objectCreated.author = req.user._id;
      post.create(objectCreated , function(err , data){
        if(err){
          res.json({status : false , message : err});
        }
        else {
          // user.findOne(req.user)
          //     .then(function(userData){
          //       userData._created.push(data._id);
          //     });
          res.json({status : true , message : "Create successfully!"});
        }
      })
  }
}
