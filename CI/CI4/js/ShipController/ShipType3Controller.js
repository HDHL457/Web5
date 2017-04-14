class ShipType3Controller extends ShipController{
  constructor (x, y, player){
    super(
      x,
      y,
      "Spaceship3-Player.png",
      {health   : 10,
       cooldown : 0},
       player
    )

    this.configs.shipSpeed = Nakama.configs.shipType3Speed;
    if(this.player == 1){
      this.configs.frameNameDefault = "Spaceship3-Player.png";
      this.configs.frameNameLeft    = "Spaceship3Left-Player.png";
      this.configs.frameNameRight   = "Spaceship3Right-Player.png";
    }

    if(this.player == 2){
      this.configs.frameNameDefault = "Spaceship3-Partner.png";
      this.configs.frameNameLeft    = "Spaceship3Left-Partner.png";
      this.configs.frameNameRight   = "Spaceship3Right-Partner.png";
    }
  }

  createLaser( anchor, configs){
    Nakama.laser.push(new PlayerBulletType3Controller(
      this.sprite.position,
      anchor,
      this.sprite,
      configs));
  }

  fire(){
    this.createLaser(
      new Phaser.Point(0,1));
    this.createLaser(
      new Phaser.Point(1,1));
  }
}
