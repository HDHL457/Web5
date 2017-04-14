var instructor = require('./instructors.model.js');

module.exports = {
  getAll : function(req , res){
    instructor.find({isDeleted : false} , {_id : 0, __v : 0})
              .populate("_courses")
              .then(function(data){
                res.send(data);
              })
              .catch(function(err){
                res.json({status : false , message : err});
              });
  },
  create : function(req, res){
    instructor.findOne({name : req.body.name})
              .then(function(data){
                if(data) res.json({status : false, message : "Name has exist!"});
                else
                  instructor.create(req.body, function(err){
                    if(err) res.json({status : false , message : err});
                    else res.json({status : true , message : "Created successfully!"});
                  })
              })
  },
  updateOne : function(req, res){
    instructor.findOne({name : {
      $ne : req.params.name,
      $eq : req.body.name
    }, isDeleted : false})
              .then(function(data){
                if(data) res.json({status : false ,
                    message : "Cannot update name due to duplicate!"});
                else
                 instructor.update({name : req.params.name}, {$set : req.body},
                    function(err){
                      if(err) res.json({status : false , message : err});
                      else res.json({status : true , message : "Updated successfully!"});
                    })
              })
  },
  getOne : function(req , res){
    instructor.findOne({name : req.params.name , isDeleted : false})
              .populate('_courses')
              .then(function(data){
                res.send(data);
              })
              .catch(function(err){
                res.json({status : false , message : err});
              })
  },
  deleteOne : function(req, res){
    instructor.findOne({name : req.params.name , isDeleted : false})
              .then(function(data){
                data.isDeleted = true;
                res.json({status : true , message : "Deleted successfully!"});
              })
              .catch(function(err){
                res.json({status : false , message : err});
              })
  }
}
