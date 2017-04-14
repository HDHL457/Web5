var Nakama = {};
Nakama.configs = {
  bulletSpeed : 1500,
  shipSpeed   : 500
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
  Nakama.keyboard = Nakama.game.input.keyboard;
  Nakama.map = Nakama.game.add.tileSprite(0, 0, 640, 960, 'background');
  Nakama.playerBulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyBulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();

  Nakama.players = [];
  Nakama.players.push(
    new ShipType1Controller(
      Nakama.game.world.centerX +150,
      Nakama.game.world.centerY +400,
      {
        up      : Phaser.Keyboard.UP,
        down    : Phaser.Keyboard.DOWN,
        right   : Phaser.Keyboard.RIGHT,
        left    : Phaser.Keyboard.LEFT,
        fire    : Phaser.Keyboard.SPACEBAR,
        coodown : 0.15,
        health  : 5
      }
    )
  );

  Nakama.players.push(
    new ShipType1PartnerController(
      Nakama.game.world.centerX -150,
      Nakama.game.world.centerY +400,
      {
        up       : Phaser.Keyboard.W,
        down     : Phaser.Keyboard.S,
        right    : Phaser.Keyboard.D,
        left     : Phaser.Keyboard.A,
        fire     : Phaser.Keyboard.SHIFT,
        cooldown : 0.15,
        health   : 5
      }
    )
  );

  Nakama.enemies = [];
   Nakama.enemies.push(
     new EnemyController(320, 100, "EnemyType1.png",{
       minX      : 100,
       maxX      : 540,
       tweenTime : 3,
       health    : 1,
       cooldown  : 0.3
     })
   );
 }

 // createShip(direction){
 //   new ShipType1Controller(
 //     this.sprite.position,
 //     direction
 //   )
 // };

 // update game state each frame
 var update = function(){

    Nakama.map.tilePosition.y += 2;

   for(var i=0;i<Nakama.players.length;i++){
     Nakama.players[i].update();
   }

   for(var i=0;i<Nakama.enemies.length;i++){
     Nakama.enemies[i].update();
   }

   Nakama.game.physics.arcade.overlap(Nakama.playerBulletGroup, Nakama.enemyGroup, onBulletHitActor);
   Nakama.game.physics.arcade.overlap(Nakama.enemyBulletGroup, Nakama.playerGroup, onBulletHitActor);
 }

 // before camera render (mostly for debug)
 var render = function(){
   // Nakama.playerGroup.forEachAlive(function(sprite){
   //   Nakama.game.debug.body(sprite);
   // })
 }

 var onBulletHitActor = function(bulletSprite, actorSprite){
   actorSprite.damage(1);
   bulletSprite.kill();
 }
