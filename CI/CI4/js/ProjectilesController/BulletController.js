class BulletController{
  constructor(position, spriteName, direction, configs){
    this.sprite = Nakama.bulletGroup.create(
      position.x,
      position.y,
      "assets",
      spriteName
  );
  this.configs = configs;
  this.sprite.anchor = new Phaser.Point(0.5 , 0.5);
  this.sprite.angle = Math.atan2(direction.x, -direction.y) * (180/Math.PI);
  this.sprite.checkWorldBounds = true;
  this.sprite.outOfBoundsKill = true;
  this.sprite.body.velocity = direction.setMagnitude(this.configs.bulletSpeed);
  /*Magnitude is the length of the vector.
  direction: -----> , the longer the vector is, the faster the bullet flies.*/


  }
}
