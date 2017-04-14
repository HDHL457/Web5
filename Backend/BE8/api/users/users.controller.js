var user = require('./users.model.js');

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
              if(data.authenticate(req.body.password))
                res.send(data);
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
