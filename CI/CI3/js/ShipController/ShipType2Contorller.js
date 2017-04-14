class ShipType2Controller extends ShipController{
  constructor(x, y, configs){
    super(
      x,
      y,
      "Spaceship2-Player.png",
      configs
    );
    frameNameDefault: "Spaceship2-Player.png";
    frameNameLeft   : "Spaceship2Left-Player.png";
    frameNameRight  : "Spaceship2Right-Player.png";
  }
}
