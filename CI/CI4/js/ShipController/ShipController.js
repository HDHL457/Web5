class ShipController {
  constructor(x,y,spriteName,configs,player){
    this.sprite = Nakama.playerGroup.create(
      x,
      y,
      "assets",
      spriteName
    );
    this.sprite.health  = configs.health;
    this.sprite.anchor = new Phaser.Point(0.5 , 0.5);
    this.sprite.body.collideWorldBounds = true;
    this.configs = configs;
    this.timeSinceLastFire = 0;
    this.player = player;
    if(this.player == 1){
      this.configs.up     = Nakama.configs.player1Keyboard.up;
      this.configs.down   = Nakama.configs.player1Keyboard.down;
      this.configs.left   = Nakama.configs.player1Keyboard.left;
      this.configs.right  = Nakama.configs.player1Keyboard.right;
      this.configs.fire   = Nakama.configs.player1Keyboard.fire;
    }

    if(this.player == 2){
      this.configs.up     = Nakama.configs.player2Keyboard.up;
      this.configs.down   = Nakama.configs.player2Keyboard.down;
      this.configs.left   = Nakama.configs.player2Keyboard.left;
      this.configs.right  = Nakama.configs.player2Keyboard.right;
      this.configs.fire   = Nakama.configs.player2Keyboard.fire;
    }
  }


  update(){

    if(Nakama.keyboard.isDown(this.configs.up)){
      this.sprite.body.velocity.y = -this.configs.shipSpeed;
      this.sprite.frameName = this.configs.frameNameDefault;
    }
    else if(Nakama.keyboard.isDown(this.configs.down)){
      this.sprite.body.velocity.y = this.configs.shipSpeed;
      this.sprite.frameName = this.configs.frameNameDefault;
    }

    else this.sprite.body.velocity.y = 0;

    if(Nakama.keyboard.isDown(this.configs.left)){
      this.sprite.body.velocity.x = -this.configs.shipSpeed;
      this.sprite.frameName = this.configs.frameNameLeft;
    }
    else if(Nakama.keyboard.isDown(this.configs.right)){
      this.sprite.body.velocity.x = this.configs.shipSpeed;
      this.sprite.frameName = this.configs.frameNameRight;
    }

    else {
      this.sprite.body.velocity.x = 0;
      this.sprite.frameName = this.configs.frameNameDefault;
    }

    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
    if(Nakama.keyboard.isDown(this.configs.fire) &&
      this.timeSinceLastFire > this.configs.cooldown && this.sprite.alive == 1){
      this.fire();
      this.timeSinceLastFire = 0;
    }
  }

  fire(){}

  createBullet(direction){}
}
