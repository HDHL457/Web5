const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Course = mongoose.Schema({
  name : {
    type : String,
    unique : true,
    required : true
  },
  title : String,
  img : String,
  description : String,
  _createdBy : {
    type : Schema.Types.ObjectId,
    ref : "user"
  },
  _instructor : {
    type : Schema.Types.ObjectId,
    ref : "instructor"
  },
  isDeleted : {
    type : Boolean,
    default : false
  }
})

var course = mongoose.model('course' , Course);
module.exports = course;
