export default class InputHandler {
  constructor(paddle) {
    document.addEventListener('keydown', (event)=> {
      //alert(event.keyCode);
      switch(event.keyCode){
        case 65: //A
          paddle.moveLeft();
          break;
        case 68: //D
          paddle.moveRight();
          break;
      }
    });

  }

}
