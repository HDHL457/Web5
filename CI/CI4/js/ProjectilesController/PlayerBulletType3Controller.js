class PlayerBulletType3Controller {
  constructor(position, anchor, ship, configs){
    this.sprite = Nakama.laserGroup.create(
      position.x,
      position.y,
      "assets",
      "BulletType3.png"
    );
    this.ship = ship;
    this.sprite.anchor = anchor;
    this.timeExists = 0;
  }

  update() {
    this.timeExists += Nakama.game.time.physicsElapsed;
    if(this.timeExists > 0.05)
      {
        this.sprite.kill();
        Nakama.laser.splice(Nakama.laser.indexOf(this), 1);
      }
    this.sprite.position.x = this.ship.position.x;
    this.sprite.position.y = this.ship.position.y;
  }
}
