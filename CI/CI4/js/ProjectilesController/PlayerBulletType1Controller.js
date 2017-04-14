class PlayerBulletType1Controller extends BulletController{
  constructor(position, direction){
    super(//goi constructor cua class me
        position,
        "BulletType1.png",
        direction,
        {bulletSpeed: Nakama.configs.bulletType1Speed}
      )
  }
}
