const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Instructor = mongoose.Schema({
  name : {
    type : String,
    required : true,
    unique : true
  },
  email : String,
  description : String,
  _courses : [{
    type : Schema.Types.ObjectId,
    ref : "course"
  }],
  isDeleted : {
    type : Boolean,
    default : false
  }
});

module.exports = mongoose.model("instructor" , Instructor);
