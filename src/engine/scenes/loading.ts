import { Scene } from "../scene";
import { Engine } from "../engine";

export class LoadingScene extends Scene {
  name = 'loading'
  // game: Engine;
  // constructor(game) {
  //   super(game);
  // }
  loading = 0;
  render(time) {
    this.fakeLoading()
  }
  fakeLoading() {
    const centerY = this.game.screen.height / 2 - 10; 
    const widthPart = this.game.screen.width / 10;
    this.game.ctx.fillStyle = "#ffaa44";
    this.game.ctx.fillRect(0, centerY, this.loading, 20);
    this.loading += 20;
    if (this.loading >= this.game.screen.width) {
      this.stop('menu');
    }

  }
}