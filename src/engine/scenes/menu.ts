import { Scene } from "../scene";
import { Engine } from "../engine";

export class MenuScene extends Scene {
  name = 'menu';


  update(time) {
    if (this.game.control.isDown('space')) {
      this.stop('game')
    }
  }

  render(time) {
    this.update(time)
    this.game.screen.fill('#fafafa');
    this.game.screen.fillTexsture('cosmos')
    this.game.screen.printText('Нажмите пробел!', 200, 400, {font: '24px Arial', color: '#ffffff'})
  }
}