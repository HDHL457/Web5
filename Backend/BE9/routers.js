module.exports = function(app){
  app.use('/users' , require('./api/users/users.index.js'));
  app.use('/courses' , require('./api/courses/courses.index.js'));
  app.use('/instructors', require('./api/instructors/instructors.index.js'));
}
