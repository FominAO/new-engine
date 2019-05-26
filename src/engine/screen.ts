import { ImageLoader } from "./image-loader";
import { Sprite } from "./sprite";

export class Screen {
  width = 500;
  height = 700;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  images = {};
  isImagesLoaded = false;
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.canvas = this.createCanvas(width, height);
    this.ctx = this.canvas.getContext('2d')
  }
  createCanvas(width: number, height: number) {
    const existCanvas = document.getElementsByTagName('canvas')
    let canvas = existCanvas[0] || document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
  fill(color: string, img?) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height)
  }
  createRect(x: number, y: number, w: number, h: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h)
  }
  loadImages(imageFiles) {
    const loader = new ImageLoader(imageFiles);
    loader.load().then((names) => {
      this.images = Object.assign(this.images, loader.images);
      this.isImagesLoaded = true;
    })
  }
  printText(text: string, x: number, y: number, props?: {font: string, color: string}) {
    this.ctx.fillStyle = props ? props.color : '#000000';
    this.ctx.font = props ? props.font : '24px Arial';
    this.ctx.fillText(text, x, y);
  }
  drawImage(x: number, y: number, imageName: string) {
    this.ctx.drawImage(this.images[imageName], x, y);
  }
  drawSprite(sprite: Sprite) {
    this.ctx.drawImage(
      this.images[sprite.imageName],
      sprite.sourceX,
      sprite.sourceY,
      sprite.width,
      sprite.height,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height
      );
    
  }
  fillTexsture(imageName) {
    if (this.isImagesLoaded) {
      let imgSize = {
        w: this.images[imageName].width,
        h: this.images[imageName].height
      }
      
      for (let i = 0; i <= this.width; i+=imgSize.w) {
        for (let k = 0; k <= this.height; k+=imgSize.h) {
          this.ctx.drawImage(this.images[imageName], i, k);
        }
      }
    }
  }
}