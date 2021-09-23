import Paddle from '/paddle.js';
import InputHandler from '/input.js';
import Ball from '/ball.js';
import Brick from '/brick.js';

export default class Game {
  constructor(gameWidth, gameHeight){
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }
    start(){
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);

        let brick = new Brick(this, {x: 20, y: 20});

        this.gameObject = [brick, this.ball, this.paddle];

        new InputHandler(this.paddle);
  }
    update(deltaTime){
        this.gameObject.forEach(object => object.update(deltaTime));
    }
    draw(ctx){
        this.gameObject.forEach(object => object.draw(ctx));
  }
}
