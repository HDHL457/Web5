module.exports = function(app){
  app.use('/users' , require('./api/users/'));
  app.use('/courses' , require('./api/courses/'));
  app.use('/instructors', require('./api/instructors/'));
}
