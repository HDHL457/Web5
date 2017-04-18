var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', {age : {
  type : Number,
  validate : {
    validator : function(age) {
      return (age >= 1 && age <= 3);
    },
    message : 'AGE ERROR'
  },
  required : true
}});
var cat1 = new Cat({age : 2});

cat1.save().then(function (doc){
  console.log(doc);
}, function (error) {
  console.log(error);
})
