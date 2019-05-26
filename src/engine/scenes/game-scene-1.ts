import { Scene } from "../scene";
import { Engine } from "../engine";
import { SpriteSheet } from "../sprite-sheet";
import { MaterialObject } from "../material-object";
import { Player } from "../player";

export class GameScene extends Scene {
  name = 'game';
  speedX = 0;
  speedY = 0;
  directionsGrag = ['right', 'left', 'up', 'down']
  tiles: SpriteSheet = new SpriteSheet('grag', 256, 64);
  
  // gragTiles = new SpriteSheet('grag', )
  // grag = this.tiles.getSprite(1);
  grag = this.tiles.getMaterialObject([1, 2], 400 )




  // player: Player = new Player('grag');
  platforms: MaterialObject[] = [];


  init() {
    this.grag.setXY( 0, 500)
    this.game.ctx.fillStyle = 'yellow'
    this.game.ctx.fillRect(350, 200, 100, 200)
    this.game.screen.createRect(350, 200, 100, 200, 'yellow')
  }
  update(time) {
    this.move(this.grag);
    this.grag.checkForCollide([{shape: 'rect', x1: 350, y1: 200, x2: 450, y2: 400}])
    this.grag.update(time)
  }
  render(time) {
    this.update(time)
    this.game.screen.fill('#2d2d2d');
    this.game.screen.drawSprite(this.grag)
  }
  move(target: MaterialObject) {
    const directions = <{ right: boolean, left: boolean, up: boolean, down: boolean}>{}
    const acceleration = <{ right: number, left: number, up: number, down: number}>{}
    this.directionsGrag.forEach( direction => {
      directions[direction] = this.game.control.isDown(direction);
      acceleration[direction] = 1;
    })
    acceleration.up = 5;
    target.move(directions, acceleration)
  }
}