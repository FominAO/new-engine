import { ObjectSize } from "../interfaces/object-size";
import { PositionCoordinates } from "../interfaces/position-coordinates";

export class Rect {
  
  constructor(
    private ctx: CanvasRenderingContext2D, 
    private size: ObjectSize,
    private pos: PositionCoordinates ) {

  }

  draw() {
    return this.ctx.fillRect(this.pos.x, this.pos.y, this.size.height, this.size.width)
  }
}