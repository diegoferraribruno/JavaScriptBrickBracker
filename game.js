import Paddle from '/paddle.js';
import InputHandler from '/input.js';
import Ball from '/ball.js';
//import Brick from '/brick.js';
import { buildLevel, level1, level2 } from "/level.js"

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
}

export default class Game {
  constructor(gameWidth, gameHeight){
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.gameObject = [];
    this.bricks = [];
    this.lives = 3;
    this.levels = [level1,level2];
    this.currentLevel = 0;
    new InputHandler(this.paddle, this.ball, this);

  }
  start(){
    if(this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
     return;
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObject = [this.ball, this.paddle];
    this.gamestate = GAMESTATE.RUNNING;
  }
    update(deltaTime){
        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
        if(this.gamestate === GAMESTATE.PAUSED ||
           this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER
          )
           return;
        [...this.gameObject, ...this.bricks].forEach(object =>
          object.update(deltaTime));
        this.bricks = this.bricks.filter(
          brick => !brick.markedForDeletion
        );
        if(this.bricks.length === 0 ){
          this.gamestate = GAMESTATE.NEWLEVEL;
          this.currentLevel++;
          this.start();
        }
    }
    draw(ctx){
          [...this.gameObject, ...this.bricks].forEach(object =>
             object.draw(ctx));
        if(this.gamestate == GAMESTATE.PAUSED){
          ctx.rect(0,0, this.gameWidth, this.gameHeight);
          ctx.fillStyle = "rgba(0,0,0,0.6)";
          ctx.fill();
          ctx.font = "30px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);

        }
        if(this.gamestate == GAMESTATE.MENU){
          ctx.rect(0,0, this.gameWidth, this.gameHeight);
          ctx.fillStyle = "rgba(0,0,0,1)";
          ctx.fill();
          ctx.font = "30px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("PRESS SPACEBAR", this.gameWidth / 2, this.gameHeight / 2);

        }
        if(this.gamestate == GAMESTATE.GAMEOVER){
          ctx.rect(0,0, this.gameWidth, this.gameHeight);
          ctx.fillStyle = "rgba(0,0,0,1)";
          ctx.fill();
          ctx.font = "30px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);

        }
  }
  togglePause(){
    if(this.gamestate == GAMESTATE.PAUSED){
      this.gamestate = GAMESTATE.RUNNING;
    } else{
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
