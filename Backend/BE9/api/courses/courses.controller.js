var course = require('./courses.model.js');
var user = require('../users/users.model.js');
var jwt = require('jsonwebtoken');
var configs = require('../../configs/configs.js');


module.exports = {
  getAll : function(req, res){
    course.find({isDeleted : false} , {_id : 0, __v : 0})
          .populate('_createdBy')
          .populate('_instructor')
          .exec(function(err, data){
            if(err) res.json({status : false , message : err});
            res.send(data);
          })
  },
  create : function(req, res){
    if(!req.body.course.name) res.json({status : false, message : "Missing name!"});
    if(!req.body.course.title) res.json({status : false, message : "Missing title!"});
    if(!req.body.course._instructor) res.json({status : false, message : "Missing instructor!"});
    if(typeof req.body.course.name !== String) res.json({satus : false, message : "Name is invalid!"});
    if(typeof req.body.course.title !== String) res.json({status : false, message: "Title is invalid!"});
    course.findOne({name : req.body.course.name})
          .then(function(data){
            if(data) res.json({status : false, message : "Name is already in used!"});
          })
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
  updateOne : function(req , res){
    course.findOne({name : {
            $eq : req.body.course.name,
            $ne : req.params.name
          } , isDeleted : false})
          .then(function(data){
            if(!data){
              course.update({name : req.params.name} , {$set : req.body} ,
                function(err){
                  if(!err) res.json({status : true , message : "Update successfully!"});
                  res.json({status : false , message : err});
                })
            }
            else res.json({status : false , message : "Course's name has already exist!"});
          })
  },
  deleteOne : function(req , res){
    course.findOne({name : req.params.name , isDeleted : false})
          .then(function(data){
            data.isDeleted = true;
            res.json({status : true , message : "Delete successfully!"});
          })
          .catch(function(err){
            res.json({status : false, message : err});
          })
  },
  getOne : function(req , res){
    course.findOne({name : req.params.name , isDeleted : false} , {_id : 0 , __v :0})
        .populate('_createdBy')
        .populate('_instructor')
        .then(function(data){
          res.send(data);
        })
        .catch(function(err){
          res.json({status : false , message : err});
        });
  }
}
