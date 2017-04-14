module.exports = function(app){
  app.use('/api/users' , require('./api/users/users.index.js'));
  app.use('/api/games' , require('./api/games/games.index.js'));
}
