var jwt = require('jsonwebtoken');
var configs = require('../../configs/configs.js');
var post = require('../posts/posts.model.js');
var comment = require('../comments/comments.model.js');

module.exports = {
  authentication : function(req , res , next){
    jwt.verify(req.headers.token, configs.jwtKey, function(err, decoded){
      if (err) res.json({status : false , message : err.message});
      else {
        req.user = decoded.data;
        next();
      }
    })
  },
  hasRole : function(role){
    return function(req, res , next){
      var roleIndex = configs.allRole.indexOf(role);
      var roleState = false;
      if(roleIndex >= 0){
          for(let i = 0; i <= roleIndex; i++){
            if(req.user.role == configs.allRole[i]) roleState = true;
          }
          if(roleState) next();
          else res.json({status : false,
              message : "You have to be " + role + "s to access this!"});
      }
      else next();
    }
  },
  hasPermissionToCreateNewUser : function(req, res, next){
    if(!req.user || req.user == "admin") next();
    else res.json({status : false , message : "You don't have permission to create new account"});
  },
  hasPermissionWithPost : function(req, res, next){
    post.findOne({_id : req.params.postId})
        .then(function(data){
          if(data.author == req.user._id || req.user.role == "admin") next();
          else res.json({status : false, message: "You don't have permission to do this!"});
        })
        .catch(function(err){
          res.json({status : false, message : err.message});
        })
  },
  hasPermissionWithComment : function(req, res, next){
    comment.findOne({_id : req.params.commentId})
            .then(function(comment){
              if(comment.author == req.user._id || req.user.role == "admin") next();
              else {
                post.findOne({_id: comment._post})
                    .then(function(post){
                      if(req.user._id == post.author) next()
                    })
                res.json({status : false, message: "You don't have permission to do this!"});
              }
            })
            .catch(function(err){
              res.json({status : false, message : err.message});
            })
  }
};
