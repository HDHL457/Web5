class ShipType3Controller extends ShipController{
  constructor(x, y, configs){
    super(
      x,
      y,
      "Spaceship3-Player.png",
      configs
    );
    frameNameDefault: "Spaceship3-Player.png";
    frameNameLeft   : "Spaceship3Left-Player.png";
    frameNameRight  : "Spaceship3Right-Player.png";
  }
}
