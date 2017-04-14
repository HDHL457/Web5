class ShipType1Controller extends ShipController{
  constructor (x, y, player){
    super(
      x,
      y,
      "Spaceship1-Player.png",
      {health   : 10,
       cooldown : 0.2},
       player
    )
    this.configs.shipSpeed = Nakama.configs.shipType1Speed;
    if(this.player == 1){
      this.configs.frameNameDefault = "Spaceship1-Player.png";
      this.configs.frameNameLeft    = "Spaceship1Left-Player.png";
      this.configs.frameNameRight    = "Spaceship1Right-Player.png";
    }

    if(this.player == 2){
      this.configs.frameNameDefault = "Spaceship1-Partner.png";
      this.configs.frameNameLeft    = "Spaceship1Left-Partner.png";
      this.configs.frameNameRight   = "Spaceship1Right-Partner.png";
    }
  }

  createBullet(direction){
    new PlayerBulletType1Controller(
      this.sprite.position,
      direction
    )
  }

  fire(){
    this.createBullet(new Phaser.Point(0,-1));
    this.createBullet(new Phaser.Point(1,-3));
    this.createBullet(new Phaser.Point(-1,-3));
    this.createBullet(new Phaser.Point(1,-6));
    this.createBullet(new Phaser.Point(-1,-6));
  }
}
