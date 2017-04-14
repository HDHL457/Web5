class ShipType3PartnerController extends ShipController{
  constructor(x, y, configs){
    super(
      x,
      y,
      "Spaceship3-Partner.png",
      configs
    );
    frameNameDefault: "Spaceship3-Partner.png";
    frameNameLeft   : "Spaceship3Left-Partner.png";
    frameNameRight  : "Spaceship3Right-Partner.png";
  }
}
