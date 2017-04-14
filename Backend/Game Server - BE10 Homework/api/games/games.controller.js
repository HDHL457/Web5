const configs = require('../../configs/configs.js');
var game = require('./games.model.js');
var user = require('../users/users.model.js');

module.exports = {
  getHighScores : function(req, res){
    game.findOne({name : req.params.name} , {_id : 0, __v : 0})
        .populate({path: 'users',
                  select: 'userId username score -_id',
                  options : {sort : {score : -1},
                            limit : configs.numberOfHighScores }})
        .then(function(data){
          if(!data) res.json({status : false, message : "Can't find your game!"});
          else res.json({status : true, highScores : data});

        })
        .catch(function(err){
          res.json({status : false, message : err.message});
        })
  }
}
