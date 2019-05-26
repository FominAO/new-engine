import { Engine } from '../engine/engine';
import { PositionCoordinates } from '../engine/interfaces/position-coordinates';
import { ObjectSize } from '../engine/interfaces/object-size';

class App {
  viewSize: ObjectSize = {
    width: 500,
    height: 700
  }
  color = '#fafafa';
  imgUrl = '/img/back.jpg'
  viewPort: PositionCoordinates;
  engine: Engine;
  constructor(height = 700, width = 500, color = '#fafafa', imgUrl = 'cosmos') {
    this.viewSize.height = height;
    this.viewSize.width = width;
    this.color = color;
    this.imgUrl = imgUrl;
    // this.viewPort = {
    //   x: this.width,
    //   y: this.height
    // }
    this.engine = new Engine(this.viewSize, this.color, this.imgUrl);
  }
}
const app = new App; // App(height, width, )
// const platformGenerator = new PlatformGenerator(100, 70, 390, 10)
// let platformsCoord = platformGenerator.generate(8)
let platforms = []
// for (let i = 0; i < platformsCoord.length; i++) {
//   platforms[i] = app.engine.createEnvRect(0 + platformsCoord[i].x, app.height - platformsCoord[i].y, 100, 10, 0, '#796082')
//   platforms[i].defyingGravity()  
// }

// var player =  app.engine.createPlayer(
//                           {x: 50, y:550}, 
//                           {width: 50, height: 50}, 2, '#e8bdbd');
// var floor = app.engine.createEnvRect(0, app.height - 10, app.width, 10, 0, '#796082')
// floor.defyingGravity()

app.engine.start()