const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var post = mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  img : String,
  content : {
    type : String,
    required : true
  },
  author : {
    type : String,
    ref : "user",
    required : true
  },
  isDeleted : {
    type : Boolean,
    required : true,
    default : false
  },
  category : {
    type : String
  },
  views : {
    type : Number,
    required : true,
    default : 0
  },
  _likedBy : [{
    type : String,
    ref : 'user'
  }],
  _comments : [{
    type : String,
    ref  : 'comment'
  }],
  is_like: Boolean
}, {
  timestamps : true,
  toObject: {
    virtuals: true
  }
  ,toJSON: {
    virtuals: true
  }
});

post.virtual('like_number').get(function () {
  return this._likedBy.length;
});

post.methods = {
  checkLikeOrNot: function (_id) { //pass _id user
    if(this._likedBy.indexOf(_id) != -1) return  true;
    else return  false;
  }
};

var post = mongoose.model('post' , post);
module.exports = post;
