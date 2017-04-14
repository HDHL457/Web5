var course = require('./courses.model.js');

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
    course.create(req.body , function(err , data){
      if(err) res.json({status : false , message : err});
      res.json({status : true , message : "Create successfully!"});
    })
  },
  updateOne : function(req , res){
    course.findOne({name : {
            $eq : req.body.name,
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
