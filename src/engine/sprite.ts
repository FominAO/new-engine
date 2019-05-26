export class Sprite {
x = 0;
y = 0;
constructor(
  public imageName: string,
  public sourceX: number,
  public sourceY: number,
  public width = 64,
  public height = 64,
) {

}
  setXY(x: number, y: number) {
    console.log(x,y,this.x,this.y)
    this.x = x;
    this.y = y;
  }
}