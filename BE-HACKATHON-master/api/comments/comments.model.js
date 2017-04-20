const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Comment = mongoose.Schema({
  author : {
    type : Schema.Types.ObjectId,
    ref: "user",
    required : true,
  },
  content : String,
  _post : [{
    type : Schema.Types.ObjectId,
    ref : "post"
  }],
  isDeleted : {
    type : Boolean,
    default : false
  }
}, {timestamps : true});

module.exports = mongoose.model("comment" , Comment);
