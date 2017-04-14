const mongoose = require('mongoose');

var Course = mongoose.Schema({
  name : {
    type : String,
    unique : true,
    required : true
  },
  title : String,
  img : String,
  description : String
})

var course = mongoose.model('course' , Course);
module.exports = course;
