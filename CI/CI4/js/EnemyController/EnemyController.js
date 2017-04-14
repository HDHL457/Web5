class EnemyController {
  constructor(x, y, spriteName, configs) {
    this.sprite = Nakama.enemyGroup.create(
      x,
      y,
      "assets",
      spriteName
    );
    this.configs = configs;
    this.sprite.health = configs.health;
    this.sprite.anchor = new Phaser.Point(0.5 , 0.5);
    this.timeSinceLastSpawn = 0;
    this.sprite.timeSinceLastFire = 0;
    this.configs.centerX = (this.configs.minX + this.configs.maxX)/2;
    this.configs.movementDistance = (this.configs.maxX - this.configs.minX)/2;
  }

  update() {
    if(this.sprite.health == 0)
    {
      this.sprite.body == null;
      this.sprite.destroy();
    }
    this.timeSinceLastSpawn += Nakama.game.time.physicsElapsed;
    this.sprite.position.x =
      this.configs.centerX +
      this.configs.movementDistance *
      Math.sin(this.timeSinceLastSpawn/this.configs.tweenTime * Math.PI * 2);

    this.sprite.timeSinceLastFire += Nakama.game.time.physicsElapsed;
    if(this.sprite.timeSinceLastFire >= this.configs.cooldown &&
      this.sprite.alive == 1){
      this.fire();
      this.sprite.timeSinceLastFire = 0;
    }
  }

  fire() {
    new EnemyBulletController(
      this.sprite.position,
      "EnemyBulletType1.png",
      new Phaser.Point(0 , 1),
      {bulletSpeed: Nakama.configs.enemyBulletSpeed});
  }
}
