var user = require('./users.model.js');

module.exports = {
  getAll : function(req, res){
    user.find({} , {_id : 0, __v : 0})
          .then(function(data){
            res.send(data);
          })
          .catch(function(err){
            res.json({status : false , message : err})
          })
  },
  create : function(req, res){
    user.create(req.body , function(err , data){
      if(err) res.json({status : false , message : err});
      res.json({status : true , message : "Create successfully!"});
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
            user.update({username : req.params.username} , {$set : req.body})
                .then(function(){
                  res.json({status : true , message : "Update successfully!"});
                })
                .catch(function(err){
                  res.json({status : false , message : err});
                });
           }
        })
  },
  deleteOne : function(req , res){
    user.remove({username : req.params.username} , function(err){
        if(err) res.json({status : false, message : err});
        res.json({status : true , message : "Delete successfully!"});
    });
  },
  getOne : function(req , res){
    user.findOne({username : req.params.username} , {_id : 0 , __v :0})
        .then(function(data){
          res.send(data);
        })
        .catch(function(err){
          res.json({status : false , message : err});
        });
  }
}
