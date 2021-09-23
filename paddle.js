export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    //this.gameHeight = game.gameHeight; #if 4 directions...

    this.width = 100;
    this.height = 20;

    this.maxSpeed = 10;
    this.speed = 0;
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 80
    };
  }

  moveLeft(){
    this.speed = -this.maxSpeed;
  }

  moveRight(){
    this.speed = this.maxSpeed;
  }

  stop(){
    this.speed = 0;
  }

  draw(ctx) {
    ctx.fillStyle = '#f00';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime){
    this.position.x += this.speed;
    //check if hit wall on left or right
    if(this.position.x < 0 ) this.position.x = 0;
    //check if top or bottom
    if(this.position.x + this.width > this.gameWidth)
      this.position.x = this.gameWidth - this.width;
  }
}
