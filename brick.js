export default class Brick {
  constructor(game, position){
    this.image = document.getElementById("img_brick");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    this.position = position
    this.width = 52;
    this.height = 32;

  }
  update(deltaTime){}

  draw(ctx){
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
