class PlayerBulletType2Controller extends BulletController{
  constructor(position, direction){
    super(
      position,
      "BulletType2.png",
      direction,
      Nakama.playerBulletGroup
    );
  }
}
