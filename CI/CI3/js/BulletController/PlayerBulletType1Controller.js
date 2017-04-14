class PlayerBulletType1Controller extends BulletController{
  constructor(position, direction){
    super(
      position,
      "BulletType1.png",
      direction,
      Nakama.playerBulletGroup
    );
  }
}
