export default class Ball {
  constructor(game){
    this.image = document.getElementById("img_ball");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    this.size = 32;
    this.position = {x:game.gameWidth/2-this.size/2, y:game.gameHeight/2-this.size/2};
    this.speed = {x:2, y: 2};
  }
  draw(ctx){
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }
  update(deltaTime){
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    //check if hit wall on left or right
    if (this.position.x < 0 || this.position.x + this.size > this.gameWidth)
    {
      this.speed.x = -this.speed.x
    }
    //check if hit wall on top or bottom
    if (this.position.y < 0 || this.position.y + this.size > this.gameHeight)
    {
      this.speed.y = -this.speed.y
    }
    //check if hit Paddle
    let bottomOfBall = this.position.y + this.size;
    let topOfPaddle = this.game.paddle.position.y;

    if(
      bottomOfBall >= topOfPaddle &&
      this.position.x  > this.game.paddle.position.x -(this.size/2) &&
      this.position.x  < this.game.paddle.position.x + this.game.paddle.width + (this.size/2)
    ) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
    //this.position.y = topOfPaddle - this.size;

  }
}
