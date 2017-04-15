var post = require('./posts.model.js');
var jwt = require('jsonwebtoken');
var configs = require('../../configs/configs.js');

module.exports = {
  getAll : function(req, res){
    post.find({isDeleted : false} , {_id : 0, __v : 0})
        .populate('_created' , {_id : 0, __v : 0})
        .exec(function(err, data){
          if(err) res.json({status : false , message : err})
          res.send(data);
        })
  },
  create : function(req, res){
    post.findOne({postid : req.body.id})
        .then(function(data){})
        .catch(function(err){
          if(err) res.json({status : false, message : err.message});
        })
  },
  editOne : function(req , res){
    post.findOne({postid : {
          $eq : req.body.id,
          $ne : req.paramsid
        }})
        .catch(function(err){
          res.json({status : false , message : err});
        });
    course.create(req.body.course.course , function(err , data){
      if(err) res.json({status : false , message : err});
      else {
        data._createdBy = req.user;
        user.findOne(req.user)
            .then(function(userData){
              userData._created = data;
            });
        res.json({status : true , message : "Create successfully!"});
      }
    })
  },
  deleteOne : function(req , res){
    post.update({postid : req.paramsid} , {$set : {isDeleted : 'true'}} , function(err){
            if(!err) res.json({status : true , message : "Delete successfully!"});
            else res.json({status : false, message : err});
          })
  },
  getOne : function(req , res){
    post.findOne({postid : req.params.id, isDeleted : false} , {_id : 0 , __v :0})
        .populate('_created')
        .then(function(data){
          res.send(data);
        })
        .catch(function(err){
          res.json({status : false , message : err});
        });
  },
  logIn : function(req, res){
    if(req.body.id && req.body.password){
      post.findOne({postid : req.body.id , isDeleted : false})
          .then(function(data){
            if(!data) {
              res.json({status : false, message : "Wrong postid!"});
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
    else res.json({status : false , message : "Missing postid or password!"});
  }
}
