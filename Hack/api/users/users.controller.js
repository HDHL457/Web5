var user = require('./users.model.js');
var jwt = require('jsonwebtoken');
var configs = require('../../configs/configs.js');

module.exports = {
  getAll : function(req, res){
    user.find({isDeleted : false} , {_id : 0, __v : 0})
        .populate('_created' , {_id : 0, __v : 0})
        .exec(function(err, data){
          if(err) res.json({status : false , message : err})
          res.send(data);
        })
  },
  create : function(req, res){
    if(!req.body.username) res.json({status : false, message :'Missing username!'});
    if(!req.body.password) res.json({status : false, message :'Missing password!'});
    if(!req.body.fullname) res.json({status : false, message :'Missing fullname!'});
    if(!req.body.email) res.json({status : false, message :'Missing email!'});
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
  updateOne : function(req , res){
    user.findOne({username : {
          $eq : req.body.username,
          $ne : req.params.username
        }})
        .then(function(data){
          if(data) res.json({status : false , message : "Username has already exist!"});
          else {
            user.findOne({username : req.params.username})
                .then(function(data){
                  user.findOne({email : {
                    $eq : req.body.email,
                    $ne : data.email
                  }})
                      .then(function(emailData){
                        if(emailData) res.json({status : false,
                                                message : "Email has been used!"});
                        else
                        user.update({username : req.params.username} , {$set : req.body})
                            .then(function(){
                              res.json({status : true , message : "Update successfully!"});
                            })
                      })
                })
          }
        })
        .catch(function(err){
          res.json({status : false , message : err});
        });
  },
  deleteOne : function(req , res){
    user.update({username : req.params.username} , {$set : {isDeleted : 'true'}} , function(err){
            if(!err) res.json({status : true , message : "Delete successfully!"});
            else res.json({status : false, message : err});
          })
  },
  getOne : function(req , res){
    user.findOne({username : req.params.username, isDeleted : false} , {_id : 0 , __v :0})
        .populate('_created')
        .then(function(data){
          res.send(data);
        })
        .catch(function(err){
          res.json({status : false , message : err});
        });
  },
  logIn : function(req, res){
    if(req.body.username && req.body.password){
      user.findOne({username : req.body.username , isDeleted : false})
          .then(function(data){
            if(!data) {
              res.json({status : false, message : "Wrong username!"});
            }
            else {
              if(data.authenticate(req.body.password)){
                var token = jwt.sign({
                  data: data
                }, configs.jwtKey , { expiresIn : '10m' });
                console.log(req.headers);
                res.json({status : true , message : "Success!" , token : token});
              }
              else res.json({status : false, message : "Wrong password!"});
            }
          })
          .catch(function(err){
            if (err) res.json({status : false , message : err});
          })
    }
    else res.json({status : false , message : "Missing username or password!"});
  }
}
