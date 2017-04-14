class ShipType2PartnerController extends ShipController{
  constructor(x, y, configs){
    super(
      x,
      y,
      "Spaceship2-Partner.png",
      configs
    );
    frameNameDefault: "Spaceship2-Partner.png";
    frameNameLeft   : "Spaceship2Left-Partner.png";
    frameNameRight  : "Spaceship2Right-Partner.png";
  }
}
