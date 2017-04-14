const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true
  },
  userId : {
    type : Number,
    required : true,
    unique : true
  },
  game : {
    type : String,
    required : true
  },
  score : {
    type : Number,
    required : true,
    default : 0
  }
});
userSchema.pre('save', function(callback){
  //Handle lacks of username, id and game fields before save
  if(!this.username) return callback(new Error("Missing username!"));
  if(!this.id) return callback(new Error("Missing user id!"));
  if(!this.game) return callback(new Error("Missing game!"));
  callback();
});


module.exports = mongoose.model('user' , userSchema);
