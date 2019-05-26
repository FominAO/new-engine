import { PositionCoordinates } from "./interfaces/position-coordinates";

export class PlatformGenerator {
  constructor(private maxYRange = 100, private minYRange = 70,
              private maxXRange = 500, private minXRange = 0) {

  }
  generate(count:number):PositionCoordinates[] {
    let coords:PositionCoordinates[] = [];
    let currentY = 0;
    for (let i=0; i < count; i++) {
      let deltaY = Math.random()*(this.maxYRange - this.minYRange) + this.minYRange
      currentY += deltaY;
      let x = Math.random()*(this.maxXRange - this.minXRange) + this.minXRange
      console.log({x:x, y:currentY})
      coords.push({x:x, y:currentY})
    }

    return coords;
  }
}
