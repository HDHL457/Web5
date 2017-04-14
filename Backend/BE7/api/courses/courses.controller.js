var course = require('./courses.model.js');

module.exports = {
  getAll : function(req, res){
    course.find({} , {_id : 0, __v : 0})
          .then(function(data){
            res.send(data);
          })
          .catch(function(err){
            res.json({status : false , message : err})
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
          }})
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
    course.remove({name : req.params.name} , function(err){
            if(!err) res.json({status : true , message : "Delete successfully!"});
            else res.json({status : false, message : err});
          })
  },
  getOne : function(req , res){
    course.findOne({name : req.params.name} , {_id : 0 , __v :0})
        .then(function(data){
          res.send(data);
        })
        .catch(function(err){
          res.json({status : false , message : err});
        });
  }
}
