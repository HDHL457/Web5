class ShipType2Controller extends ShipController{
  constructor(x, y, player){
    super(
      x,
      y,
      "Spaceship2-Player.png",
      {health   : 10,
       cooldown : 0.2},
       player
    )
    this.configs.shipSpeed = Nakama.configs.shipType2Speed;
    if(this.player == 1){
      this.configs.frameNameDefault = "Spaceship2-Player.png";
      this.configs.frameNameLeft    = "Spaceship2Left-Player.png";
      this.configs.frameNameRight   = "Spaceship2Right-Player.png";
    }

    if(this.player == 2){
      this.configs.frameNameDefault = "Spaceship2-Partner.png";
      this.configs.frameNameLeft    = "Spaceship2Left-Partner.png";
      this.configs.frameNameRight   = "Spaceship2Right-Partner.png";
    }
  }

  createBullet(direction, configs){
    Nakama.bulletType2.push( new PlayerBulletType2Controller(
      this.sprite.position,
      direction,
      configs
      )
    );
  }

  fire(){
    this.createBullet(new Phaser.Point(0,-1),
    {
      firstDirection : new Phaser.Point(1,1),
      startSpeed     : 300
    });
    this.createBullet(new Phaser.Point(0,-1),
    {
      firstDirection : new Phaser.Point(-1,1),
      startSpeed     : 300
    });
  }
}
