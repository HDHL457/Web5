const mongoose = require('mongoose');

var User = new mongoose.Schema({
  username : {
    type : String,
    required : true,
    unique : true
  },
  fullName : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  }
});

module.exports = mongoose.model('user' , User);
