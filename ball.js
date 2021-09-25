import {detectCollision} from '/collisionDetection.js';

export default class Ball {
  constructor(game){
    this.image = document.getElementById("img_ball");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    this.size = 8;


    this.height = this.size
    this.width = this.size
    this.reset(this.gameWidth, this.gameHeight);
  }
  reset(w,h){
    this.position = {x: this.gameWidth/2-this.size/2, y:this.gameHeight/2-this.size/2};
    this.speed = {x:2, y: -2};
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
    //check if hit wall on top
    if (this.position.y < 0)
    {
      this.speed.y = -this.speed.y
    }
    if ( this.position.y + this.size > this.gameHeight){
      this.game.lives--;
      this.reset();
    }
    if(detectCollision(this, this.game.paddle)){
      this.speed.x = -this.speed.x;
      this.speed.y = -this.speed.y;
      //this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
