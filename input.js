export default class InputHandler {
  constructor(paddle, ball, game) {
    document.addEventListener('keydown', (event)=> {
      //alert(event.keyCode);
      switch(event.keyCode){
        case 37:
          paddle.moveLeft();
          ball.inputSet(-1);
          break;
        case 39:
          paddle.moveRight();
          ball.inputSet(1);
          break;
        case 27:
          game.togglePause();
          break;
        case 32:
          game.start();
          break;
      }
    });

    document.addEventListener('keyup', (event)=> {
      //alert(event.keyCode);
      switch(event.keyCode){
        case 37:
          if (paddle.speed < 0) {
              paddle.stop();
              ball.inputSet(0);
              break;

        }
        case 39:
          if (paddle.speed > 0) {
              ball.inputSet(0);
              paddle.stop();
              break;
      }
    }
    });
  }
}
