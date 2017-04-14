var user = require('./users.model.js');
var configs = require('../../configs/configs.js');
var game = require('../games/games.model.js');

module.exports = {
  create : function(req, res){
    //Check input
    if(!req.body.username) res.json({status : false, message :'Why no username?'});
    if(!req.body.userId) res.json({status : false, message :'Why no id?'});
    if(!req.body.game) res.json({status: false, message : 'Play no shit?'});
    if(typeof req.body.username != 'string')
      res.json({status : false, message : "Username is invalid!"});

    //Check if the id is unique or not
    user.findOne({userId : req.body.userId})
        .then(function(data){
          if(data) {
            res.json({status : false, message : "Id has been used!"});}
          else {
            //Create new user and update game's users field
              var newUser = new user(req.body);
              newUser.save().then(function(user){
                game.findOneAndUpdate({name : req.body.game},
                                  {$push : {users: user._id }},
                                  {upsert : true})
                    .then(function(game){
                      res.json({status : true , message : "Create successfully!"});
                    })
              });
          }
        })
        .catch(function(err){
          if(err) res.json({status : false, message : err.message});
        })
  },
  //find user based on id and update username
  updateUsername : function(req, res){
    if(!req.body.username) res.json({status : false, message : "Where's my username?"});
    else {
      user.update({userId : req.params.userId},
                  {$set : {username : req.body.username}})
          .then(function(user){
            if(!user) res.json({status : false , message : "This user doesn't exist!"});
            else res.json({status : true , message : "Update successfully!"});
          })
          .catch(function(err){
            res.json({status : false , message : err.message});
          });
    }
  },
  //find user based on id and update score
  updateScore : function(req , res){
    if(!req.body.score) res.json({status : false, message : "Where's my score?"});
    else {
      user.update({userId : req.params.userId},
                  {$set : {score : req.body.score}})
          .then(function(user){
            if(!user) res.json({status : false , message : "This user doesn't exist!"});
            else res.json({status : true , message : "Update successfully!"});
          })
          .catch(function(err){
            res.json({status : false , message : err.message});
          });
    }
  },
  //get an user information based on id
  getOne : function(req , res){
    user.findOne({userId : req.params.userId} , {_id : 0 , __v :0})
        .then(function(user){
          if(!user) res.json({status : false, message : "This user doesn't exist!"});
          else res.json({status : true, user : user});
        })
        .catch(function(err){
          res.json({status : false , message : err.message});
        });
  }
}
