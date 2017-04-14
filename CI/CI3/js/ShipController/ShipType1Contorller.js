class ShipType1Controller extends ShipController{
  constructor(x, y, configs){
    super(
      x,
      y,
      "Spaceship1-Player.png",
      configs
    );
    frameNameDefault: "Spaceship1-Player.png";
    frameNameLeft   : "Spaceship1Left-Player.png";
    frameNameRight  : "Spaceship1Right-Player.png";
  }
}
