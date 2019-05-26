import { PositionCoordinates } from './interfaces/position-coordinates';
import { ObjectSize } from './interfaces/object-size';
import { Screen } from './screen';
import { LoadingScene } from './scenes/loading';
import { Scene } from './scene';
import { MenuScene } from './scenes/menu';
import { KeyBoard } from './keyboard';
import { GameScene } from './scenes/game-scene';
require('../assets/textures/cosmos.png');
require('../assets/textures/grag-move.png');
require('../assets/textures/64x64.png');
require('../assets/textures/plats.png');
export class Engine {
  d = document;
  fps = 10;
  ctx: CanvasRenderingContext2D;
  screen: Screen;
  control: KeyBoard;
  scenes = {
    loading: new LoadingScene(this),
    menu: new MenuScene(this),
    game: new GameScene(this)
  }

  scenario = [
    'loading',
    'menu',
    'game'
  ]
  currentScene: Scene;
  constructor(private viewSize: ObjectSize, BACKGROUND_COLOR, IMAGE) {
    this.screen = new Screen(640, 640);
    this.ctx = this.screen.ctx;

    this.screen.loadImages({
      cosmos: 'assets/images/cosmos.png',
      64: 'assets/images/64x64.png',
      grag: 'assets/images/grag-move.png',
      plats: 'assets/images/plats.png'
    })
    this.currentScene = this.scenes[this.scenario[0]];
    this.currentScene.init();
    this.control = new KeyBoard();
    // let c = this.d.createElement('canvas');
    // c.style.position = 'fixed';
    // c.style.left = '0';
    // c.style.top = '0';


    // c.style.backgroundColor = BACKGROUND_COLOR;
    // if (IMAGE) {
    //   c.style.backgroundImage = 'url(assets/'+ IMAGE+ '.png)';
    //   c.style.backgroundSize = 'cover';
    //   c.style.backgroundPosition = 'center';
    // }

  }
  // createRect(x, y, width, height, speed, color, img?) {
  //   return new Rect(this.ctx, x, y, width, height, speed, color)
  // }
  // createPlayer(startPosition:PositionCoordinates, objSize:ObjectSize, backgroundColor, texture) {
  //   this.player = new Player(startPosition, objSize, backgroundColor, texture)
  // }
  // createEnvRect(x, y, width, height, speed, color, img?) {
  //   return new EnvironmentElem(this.ctx, x, y, width, height, speed, color)
  // }


  public action() {
  }
  // engine() {
    
  //   setInterval(requestAnimationFrame , this.fps, () => {
  //     this.currentScene.render()
  //     this.ctx.clearRect(0, 0, this.viewSize.width, this.viewSize.height)
  //     this.action()
  //   })
  // }
  // start() {
  //   this.engine()
  // }
  engine(time) {
    if (!this.currentScene.isActive) {
      this.currentScene = this.scenes[this.currentScene.nextScene]
      this.currentScene.init()
    }
    this.currentScene.render(time);
    requestAnimationFrame(time => this.engine(time))
  }
  start() {
    requestAnimationFrame(time => this.engine(time))
  }

  // gravity(obj:MaterialObject) { 
  // }


}