import { Sprite } from "./sprite";
import { Animation } from "./animation";
import { MaterialObject } from "./material-object";

export class SpriteSheet {


  constructor(
    public imageName: string,
    public imageWidth: number,
    public imageHeight: number,
    public spriteWidth = 64,
    public spriteHeight = 64,
    // public sourceX: number,
    // public sourceY: number,
  ) {

  }
  getSprite(index) {
    return new Sprite(
      this.imageName, 
      this.getSourceX(index),
      this.getSourceY(index),
      this.spriteWidth,
      this.spriteHeight
      )
  }

  getSourceX(index) {
    return (--index * this.spriteWidth) % this.imageWidth;
  }

  getSourceY(index) {
    return Math.trunc(((--index * this.spriteWidth) / this.imageWidth)) * this.spriteHeight
  }
  getAnimation(indexes, speed, repeat = true, autorun = true) {
    return new Animation(
      this.imageName,
      indexes.map(index => ({sx: this.getSourceX(index), sy: this.getSourceY(index)})),
      speed,
      repeat,
      autorun,
      this.spriteWidth,
      this.spriteHeight
    )
  }
  getMaterialObject(indexes, speed, repeat = true, autorun = true) {
    return new MaterialObject (
      this.imageName,
      indexes.map(index => ({sx: this.getSourceX(index), sy: this.getSourceY(index)})),
      speed,
      repeat,
      autorun,
      this.spriteWidth,
      this.spriteHeight
    )
  }
}