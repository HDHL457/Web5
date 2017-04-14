class EnemyController {
  constructor(x,y,spriteName,configs){
    this.sprite = Nakama.enemyGroup.create(
      x,
      y,
      "assets",
      spriteName
    );
    this.configs = configs;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.health = this.configs.health;

    this.timeSinceSpawn = 0;
    this.configs.centerX = (this.configs.minX + this.configs.maxX)/2;
    this.configs.movementDistance = (this.configs.maxX - this.configs.minX)/2;

    this.timeSinceLastFire = 0;
  }

  update(){
    this.timeSinceSpawn += Nakama.game.time.physicsElapsed;
    this.sprite.position.x =
      this.configs.centerX
      + this.configs.movementDistance
      * Math.sin(Math.PI*2*this.timeSinceSpawn/this.configs.tweenTime);

    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
    if(this.timeSinceLastFire > this.configs.cooldown){
      this.fire();
      this.timeSinceLastFire = 0;
    }
  }

  fire(){
    if(!this.sprite.alive) return;

    new BulletController(
      this.sprite.position,
      "EnemyBulletType1.png",
      new Phaser.Point(0, 1),
      Nakama.enemyBulletGroup
    );
  }
}
