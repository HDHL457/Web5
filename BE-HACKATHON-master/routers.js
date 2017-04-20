module.exports = function(app){
  app.use('/users' , require('./api/users/users.index.js'));
  app.use('/posts' , require('./api/posts/posts.index.js'));
};
