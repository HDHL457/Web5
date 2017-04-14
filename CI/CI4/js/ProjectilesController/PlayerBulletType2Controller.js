class PlayerBulletType2Controller extends BulletController{
  constructor(position, direction, configs){
    super(
        position,
        "BulletType2.png",
        direction,
        {bulletSpeed : Nakama.configs.bulletType2Speed,
        configs}
      )
    this.direction = direction;
    this.timeBeforeChangeDirection = 0;
    this.configs.configs.startSpeed = configs.startSpeed;
    this.configs.configs.firstDirection = configs.firstDirection;
  }

  update() {
    //Set up the missile's first direction and speed when start firing,
    //like real missile
    this.timeBeforeChangeDirection += Nakama.game.time.physicsElapsed;
    if(this.timeBeforeChangeDirection < 0.2) {
      this.sprite.body.velocity =
      this.configs.configs.firstDirection.setMagnitude(this.configs.configs.startSpeed);
    }

    //Start my auto missile, give it auto direction
    if(this.timeBeforeChangeDirection >= 0.2) {
      //If there's any enemy, have to kill 'em all
      if(Nakama.enemies.length != 0) {
        // Check which is the nearest enemy for my missile
        var indexOfMinDistanceEnemy = 0;
        for( var i = 1; i < Nakama.enemies.length; i++)
        {
            var d1x = Nakama.enemies[i].sprite.position.x - this.sprite.position.x;
            var d1y = Nakama.enemies[i].sprite.position.y - this.sprite.position.y;
            var d2x = Nakama.enemies[i-1].sprite.position.x - this.sprite.position.x;
            var d2y = Nakama.enemies[i-1].sprite.position.y - this.sprite.position.y;
            if ((d1x * d1x + d1y * d1y) < (d2x * d2x + d2y * d2y))
            indexOfMinDistanceEnemy = i;
        }

        //Give it a direction which is update 60 times per second, using vector.
        var bulletDirection = new Phaser.Point(
          Nakama.enemies[indexOfMinDistanceEnemy].sprite.position.x -
          this.sprite.position.x,
          Nakama.enemies[indexOfMinDistanceEnemy].sprite.position.y -
          this.sprite.position.y);

        // If enemy is alive, then let the missile flies straight to the enemy.
        if(Nakama.enemies[indexOfMinDistanceEnemy].sprite.alive) {
          this.sprite.angle = Math.atan2(bulletDirection.x, -bulletDirection.y)
          * (180/Math.PI);
          this.sprite.body.velocity =
          bulletDirection.setMagnitude(this.configs.bulletSpeed);
        }
      }
      //If there's no enemy, let the missile flies its first defined direction
      else {
        this.sprite.body.velocity =
        this.direction.setMagnitude(this.configs.bulletSpeed);
        this.sprite.angle = Math.atan2(this.direction.x, -this.direction.y)
        * (180/Math.PI);
      }
    }
  }
}

//Below is a buggy but cooler and better way to make missile.

/*  this.timeBeforeChangeDirection += Nakama.game.time.physicsElapsed;
    if(this.timeBeforeChangeDirection >= 0.1) {
      if(Nakama.enemies.length != 0) {
        var indexOfMinDistanceEnemy = 0;
        for( var i = 1; i < Nakama.enemies.length; i++)
        {
            var d1x = Nakama.enemies[i].sprite.position.x - this.sprite.position.x;
            var d1y = Nakama.enemies[i].sprite.position.y - this.sprite.position.y;
            var d2x = Nakama.enemies[i-1].sprite.position.x - this.sprite.position.x;
            var d2y = Nakama.enemies[i-1].sprite.position.y - this.sprite.position.y;
            if ((d1x * d1x + d1y * d1y) < (d2x * d2x + d2y * d2y))
            indexOfMinDistanceEnemy = i;
        }

        var targetAngle = Nakama.game.math.angleBetween(
          this.sprite.position.x, this.sprite.position.y,
          Nakama.enemies[indexOfMinDistanceEnemy].sprite.position.x ,
          Nakama.enemies[indexOfMinDistanceEnemy].sprite.position.y
        );
        console.log(this.sprite.angle);
        console.log("and" + this.sprite.rotation);

        if(this.sprite.rotation !== targetAngle) {
          var delta = targetAngle - this.sprite.rotation;

          // -PI <= delta <= PI
          if (delta > Math.PI) delta -= Math.PI * 2;
          if (delta < -Math.PI) delta += Math.PI * 2;

          if (delta > 0) {
            this.sprite.angle += this.TURN_RATE;
          }
          else {
            this.sprite.angle -= this.TURN_RATE;
          }

          if (Math.abs(delta) < Nakama.game.math.degToRad(this.TURN_RATE)) {
                this.sprite.rotation = targetAngle;
          }
        }

        this.sprite.body.velocity.x = Math.cos(this.sprite.rotation)
        * this.configs.bulletSpeed;
        this.sprite.body.velocity.y = Math.sin(this.sprite.rotation)
        * this.configs.bulletSpeed; */
