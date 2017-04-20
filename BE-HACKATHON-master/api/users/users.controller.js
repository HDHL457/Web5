var user = require('./users.model.js');
var jwt = require('jsonwebtoken');
var configs = require('../../configs/configs.js');
var post = require('../posts/posts.model.js');

module.exports = {
  signUp : function(req, res){
    if(!req.body.username) res.json({status : false, message :'Missing username!'});
    if(!req.body.password) res.json({status : false, message :'Missing password!'});
    if(!req.body.fullname) res.json({status : false, message :'Missing fullname!'});
    if(!req.body.email)    res.json({status : false, message :'Missing email!'});
    if(typeof req.body.username != 'string') res.json({status : false,
        message : "Username is invalid!"});
    if(typeof req.body.fullname != 'string') res.json({status : false,
        message : "Fullname is invalid!"});
    if(typeof req.body.email != 'string') res.json({status : false,
        message : "Email is invalid!"});
    user.findOne({username : req.body.username})
        .then(function(data){
          if(data) res.json({status : false, message : "Username has already been taken!"});
          else {
            user.findOne({email : req.body.email})
                .then(function(data){
                  if(data) res.json({status : false, message : "Email has been used!"});
                  else {
                    user.create(req.body , function(err , data){
                      if(err) res.json({status : false , message : err});
                      res.json({status : true , message : "Create successfully!"});
                    })
                  }
                })
          }
        })
        .catch(function(err){
          if(err) res.json({status : false, message : err.message});
        })
  },
  editInfo : function(req , res){
    user.findOne({email : {$eq : req.body.email, $ne : req.user.email}})
        .then(function(emailData){
          if(emailData) res.json({status : false, message : "Email has been used!"});
          else{
            if(req.body.fullname)
              user.update({username : req.users.username},
                          {$set : {fullname : req.body.fullname}})
                  .catch(function(err){
                    res.json({status : false , message : err.message});
                  })
            if(req.body.email)
              user.update({username : req.users.username},
                          {$set : {email : req.body.email}})
                  .catch(function(err){
                    res.json({status : false , message : err.message});
                  })
          }
        })
        .then(function(){
          res.json({status: true, message : "Edit successfully!"});
        })
        .catch(function(err){
          res.json({status : false , message : err.message});
        });
  },
  getOneUser : function(req , res){
    user.findOne({username : req.params.username, isDeleted : false} ,
                  {_id:0 , __v:0 , password:0, isDeleted:0, salt:0})
        .populate('_created')
        .populate('_liked')
        .then(function(data){
          res.json({status: true, data : data});
        })
        .catch(function(err){
          res.json({status : false , message : err});
        });
  },
  getUrself : function(req, res){
    user.findOne({username : req.user.username, isDeleted : false} ,
                  {_id:0 , __v:0 , password:0, isDeleted:0, salt:0})
        .populate('_created')
        .populate('_liked')
        .then(function(data){
          res.json({status: true, data : data});
        })
        .catch(function(err){
          res.json({status : false , message : err});
        });
  },
  banUser : function(req, res){
    user.updateOne({username : req.params.username, isDeleted : false} ,
                    {$set : {isDeleted : true}});
  },
  logIn : function(req, res){
    if(req.body.username && req.body.password){
      req.body.username = req.body.username.toLowerCase();
      user.findOne({username : req.body.username , isDeleted : false})
          .then(function(data){
            if(!data) {
              res.json({status : false, message : "Wrong username!"});
            }
            else {
              if(data.authenticate(req.body.password)){
                var token = jwt.sign({
                  data: data
                }, configs.jwtKey , { expiresIn : '30d' });
                res.json({status : true , message : "Success!" , result: {token : token, username: data.username, avatar: data.avatar, _id: data._id }});
              }
              else res.json({status : false, message : "Wrong password!"});
            }
          })
          .catch(function(err){
            if (err) res.json({status : false , message : err});
          })
    }
    else {
      if(req.body.username)
        res.json({status : false , message : "Missing password!"});
      else res.json({status: false, message : "Missing username!"});
    }
  }
}
