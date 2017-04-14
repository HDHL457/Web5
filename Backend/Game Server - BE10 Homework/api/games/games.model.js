const mongoose = require('mongoose');

//Create a schema for game objects
var gameSchema = mongoose.Schema({
  name : {
    type : String,
    required : true,
    unique : true
  },
  gameId : {
    type : Number,
    required : true,
    unique : true
  },
  users : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "user"
  }]
});

module.exports = mongoose.model('game', gameSchema);
