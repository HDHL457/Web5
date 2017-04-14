class ShipType1PartnerController extends ShipController{
  constructor(x, y, configs){
    super(
      x,
      y,
      "Spaceship1-Partner.png",
      configs
    );
    frameNameDefault: "Spaceship1-Partner.png";
    frameNameLeft   : "Spaceship1Left-Partner.png";
    frameNameRight  : "Spaceship1Right-Partner.png";
  }
}
