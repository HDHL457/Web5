var Nakama = {};
Nakama.configs = {
  bulletType1Speed    : 1500,
  bulletType2Speed    : 1200,
  shipType1Speed      : 500,
  shipType2Speed      : 300,
  shipType3Speed      : 200,
  enemySpeed          : 300,
  maxEnemy            : 3,
  enemyCooldown       : 4,
  enemyBulletSpeed    : 800,
  player1Keyboard : {
    up    : Phaser.Keyboard.UP,
    down  : Phaser.Keyboard.DOWN,
    left  : Phaser.Keyboard.LEFT,
    right : Phaser.Keyboard.RIGHT,
    fire  : Phaser.Keyboard.SPACEBAR
  },
  player2Keyboard : {
    up    : Phaser.Keyboard.W,
    down  : Phaser.Keyboard.S,
    left  : Phaser.Keyboard.A,
    right : Phaser.Keyboard.D,
    fire  : Phaser.Keyboard.J
  }
};

window.onload = function(){
  Nakama.game = new Phaser.Game(640,960,Phaser.AUTO,'',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    }, false, false
  );
}

// preparations before game starts
var preload = function(){
  Nakama.game.scale.minWidth = 320;
  Nakama.game.scale.minHeight = 480;
  Nakama.game.scale.maxWidth = 640;
  Nakama.game.scale.maxHeight = 960;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Nakama.game.time.advancedTiming = true;

  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.image('background', 'Assets/Map1.png');
}

// initialize the game
var create = function(){
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.background = Nakama.game.add.tileSprite(0, 0, 640, 1920, "background");
  Nakama.keyboard         = Nakama.game.input.keyboard;
  Nakama.playerGroup      = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup       = Nakama.game.add.physicsGroup();
  Nakama.bulletGroup      = Nakama.game.add.physicsGroup();
  Nakama.enemyBulletGroup = Nakama.game.add.physicsGroup();
  Nakama.laserGroup       = Nakama.game.add.physicsGroup();


  Nakama.players = [];
  Nakama.players.push(
    new ShipType3Controller(200,800,1));
  Nakama.players.push(
    new ShipType3Controller(400,800,2));


  Nakama.enemies = [];
  Nakama.enemies.push(new EnemyController(
    320,
    100,
    "EnemyType1.png",
    {cooldown : 0.5,
    minX      : 100,
    maxX      : 540,
    tweenTime : 3,
    health    : 50}
  ));

  Nakama.enemies.push(new EnemyController(
    600,
    320,
    "EnemyType1.png",
    {cooldown : 0.5,
    minX      : 50,
    maxX      : 590,
    tweenTime : 2,
    health    : 50}
  ));

  Nakama.bulletType2 = [];
  Nakama.laser = [];
  Nakama.timeSinceLastEnemySpawn = 0;
}

// update game state each frame
var update = function(){
  Nakama.timeSinceLastEnemySpawn += Nakama.game.time.physicsElapsed;
  Nakama.background.tilePosition.y += 5;
  Nakama.game.debug.body(Nakama.bulletGroup);

  for(var i = 0; i < Nakama.players.length ; i++){
    Nakama.players[i].update();
  }

  for(var i = 0; i < Nakama.enemies.length; i++) {
    Nakama.enemies[i].update();
    if(Nakama.enemies[i].sprite.alive == 0) Nakama.enemies.splice(i, 1);
  }

  for( var i = 0; i < Nakama.bulletType2.length; i++) {
    Nakama.bulletType2[i].update();
  }

  for(var i = 0; i < Nakama.laser.length; i++) {
    Nakama.laser[i].update();
  }

  if(Nakama.enemies.length < Nakama.configs.maxEnemy) {
    if(Nakama.timeSinceLastEnemySpawn >= Nakama.configs.enemyCooldown) {
      Nakama.enemies.push(new EnemyController(
        Math.round(Math.random()*440 + 100),
        Math.round(Math.random()*400 + 100),
        "EnemyType1.png",
        {cooldown : 0.5,
        minX      : Math.round(Math.random()*50 + 100),
        maxX      : Math.round(Math.random()*500 + 150),
        tweenTime : Math.round(Math.random()*3 + 1),
        health    : 50}
      ));
      Nakama.timeSinceLastEnemySpawn = 0;
    }
  }

//  console.log(OutRangeX(Nakama.enemies[0].position.x));

    Nakama.game.physics.arcade.overlap(
      Nakama.bulletGroup,
      Nakama.enemyGroup,
      onBulletHitEnemy);

    Nakama.game.physics.arcade.overlap(
      Nakama.enemyBulletGroup,
      Nakama.playerGroup,
      onBulletHitPlayer);

    Nakama.game.physics.arcade.overlap(
      Nakama.enemyGroup,
      Nakama.playerGroup,
      enemyAndPlayerCollision);

    Nakama.game.physics.arcade.overlap(
      Nakama.laserGroup,
      Nakama.enemyGroup,
      onLaserHitEnemy);
}

// before camera render (mostly for debug)
var render = function(){}

var onBulletHitEnemy = function(bulletSprite, enemySprite){
  enemySprite.damage(1);
  bulletSprite.kill();
}

var onBulletHitPlayer = function(enemyBulletSprite, playerSprite){
  playerSprite.damage(1);
  enemyBulletSprite.kill();
}

var enemyAndPlayerCollision = function(enemySprite, playerSprite){
  playerSprite.damage(3);
  enemySprite.kill();
}

var onLaserHitEnemy = function(laserSprite, enemySprite){
  enemySprite.damage(1);
}
