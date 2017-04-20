var comment = require('./comments.model.js');
var post = require('../posts/posts.model.js');
var configs = require('../../configs/configs.js');

module.exports = {
  createComment : function(req, res){
    var newComment = {};
    newComment.content = req.body.content;
    newComment._post = req.params.postId;
    newComment.author = req.user._id;
    comment.create(newComment, function(err, data){
      if(err) res.json({status : false, message : err.message});
      else {
        post.findOneAndUpdate({_id : req.params.postId, isDeleted : false},
                              {$push : {_comments : data._id}},
                              {upsert : true, new : true})
            .then(function(){
              res.json({status: true, message : "Posted successfully!", result: data});
            })
            .catch(function(err){
              res.json({status: false, message : err.message});
            })
      }
    })
  },
  getAllComment : function(req, res){
    post.findOne({_id : req.params.postId, isDeleted : false})
        .populate('_comments')
        .then(function(data){
          if(data._comments)
            res.json({status : true, comments : data._comments});
          else res.json({status : true, message : "There's no comment"});
        })
        .catch(function(err){
          res.json({status : false, message : err.message});
        })
  },
  getOneComment : function(req, res){
    comment.findOne({_id : req.params.commentId, isDeleted : false})
           .then(function(data){
             res.json({status : true, comment : data});
           })
           .catch(function(err){
             res.json({status : false, message : err.message});
           })
  },
  editOneComment : function(req, res){
    if(req.body.content){
      comment.findOneAndUpdate({_id : req.params.commentId, isDeleted : false} ,
                              {$set : {content : req.body.content}},
                              {upsert : true, new : true})
              .then(function(data){
                 res.json({status : true , message : "Updated successfully!"});
              })
              .catch(function(err){
                res.json({status : false, message : err.message});
              })
    }
  },
  deleteOneComment : function(req, res){
    comment.findById(req.params.commentId).remove().exec(function (err, data) {
      if(err) {
        res.json({status : false , message : err.message});
      }
      res.json({status : true , message : "Deleted successfully!"});
    })
  }
};
