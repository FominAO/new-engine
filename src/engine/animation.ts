import { Sprite } from "./sprite";

export class Animation extends Sprite {
  running = this.autorun;
  lastTime = 0;
  currentFrame = 0;
  totalFrames = this.frames.length;
  constructor(
    public imageName: string,
    public frames,
    public speed: number,
    public repeat = true,
    public autorun = true,
    public width = 64,
    public height = 64,
  ) {
    super(
      imageName,
      frames[0].sx,
      frames[0].sy,
      width,
      height
    )
  }
  setFrame(index) {
    this.currentFrame = index;
    this.sourceX = this.frames[index].sx;
    this.sourceY = this.frames[index].sy;
  }
  run() {
    this.setFrame(0);
    this.running = true;
  }
  stop() {
    this.running = false;
  }
  nextFrame() {
    if ((this.currentFrame + 1) === this.totalFrames) {
      if (this.repeat) {
        this.setFrame(0);
        return;
      }
      this.stop();
      return
    }
    this.setFrame(this.currentFrame + 1);
  }
  update(time) {
    if (!this.running) {
      return
    }
    if (this.lastTime === 0) {
        this.lastTime = time;
        return;
    }
    if ((time - this.lastTime) > this.speed) {
      this.nextFrame()
      // this.lastTime += this.lastTime += this.speed;
      this.lastTime += this.speed
    }

  }
}