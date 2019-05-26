// import { SpriteSheet } from "./sprite-sheet";
import { Animation } from "./animation";
import { MaterialObjectConfig } from "./material-object-config";
import { KeyBoard } from "./keyboard";

export class Player extends Animation {
  gravity = 0.1;
  airViscosity = 0.1;
  velocityX = 0;
  velocityY = 0;
  accelerationX = 0;
  accelerationY = 0;
  maxVelocityX = 6;
  maxVelocityFall = 2;
  maxVelocityY = 10;
  verticalWall = 0;
  horisontalWall = 0;
  
  config(config: MaterialObjectConfig) {
    this.gravity = config.gravity ? config.gravity : this.gravity;
    this.airViscosity = config.airViscosity ? config.airViscosity : this.airViscosity;
    this.velocityX = config.velocityX ? config.velocityX : this.velocityX;
    this.velocityY = config.velocityY ? config.velocityY : this.velocityY;
    this.accelerationX = config.accelerationX ? config.accelerationX : this.accelerationX;
    this.accelerationY = config.accelerationY ? config.accelerationY : this.accelerationY;
    this.maxVelocityX = config.maxVelocityX ? config.maxVelocityX : this.maxVelocityX;
    this.maxVelocityFall = config.maxVelocityFall ? config.maxVelocityFall : this.maxVelocityFall;
    this.maxVelocityY = config.maxVelocityY ? config.maxVelocityY : this.maxVelocityY;
  }

  simulateGravity() {
    if (this.velocityY + this.gravity < this.maxVelocityFall) {
      this.velocityY = this.velocityY + this.gravity;
    } else {
      this.velocityY = this.maxVelocityFall;
    }
  }

  simulateAirResistance() {
    const airViscositySign = Math.sign(this.velocityX * -1)
    if (Math.abs(this.velocityX + this.airViscosity * airViscositySign) < this.maxVelocityX) {
      this.velocityX = this.velocityX + this.airViscosity * airViscositySign;
    } else {
      this.velocityX = 0;
    }
  }
  getNextCoordinates() {
    const oldCoords = {
      x: this.x,
      y: this.y
    }
    const oldVelocity = {
      velocityX: this.velocityX,
      velocityY: this.velocityY
    }
    // this.move(1);

    const newCoords = {
      x: this.x,
      y: this.y
    }
    const newVelocity = {
      velocityX: this.velocityX,
      velocityY: this.velocityY
    }
  }
  move(directions: { right: boolean, left: boolean, up: boolean, down: boolean}, acceleration: { right: number, left: number, up: number, down: number}) {
    this.simulateGravity();
    this.velocityX !== 0 ? this.simulateAirResistance() : '';
    let accX = 0;
    let accY = 0;
    if (directions.right) {
      accX += acceleration.right;
    }
    if (directions.left) {
      accX += -acceleration.left;
    }
    this.accelerationX = accX;

    if (directions.up) {
      // accY += -acceleration.up;
      this.velocityY = -acceleration.up
    }
    if (directions.down) {
      accY += acceleration.down;
    }
    this.accelerationY = accY;
    
 
    if (Math.abs(this.velocityX + this.accelerationX) < this.maxVelocityX) {
      this.velocityX = this.velocityX + this.accelerationX;
    } else {
      this.velocityX = Math.sign(this.velocityX) * this.maxVelocityX;
    }
    if (Math.abs(this.velocityY + this.accelerationY) < this.maxVelocityY) {
      this.velocityY = this.velocityY + this.accelerationY;
    } else {
      this.velocityY = Math.sign(this.velocityY) * this.maxVelocityY;
    }
    if (this.velocityX * this.verticalWall <= 0) {
      this.x = this.x +this.velocityX;
    }
    if (this.velocityY * this.horisontalWall <= 0) {
      this.y = this.y +this.velocityY;
    }
  }
  checkForCollide(propsList:{shape: string, x1: number, y1: number , x2: number, y2: number}[]) {
    const x1 = this.x;
    const x2 = this.x + this.width;
    const y1 = this.y;
    const y2 = this.y + this.height;
    const cX = this.x + this.width/2;
    const cY = this.y + this.height/2;
    propsList.forEach( prop => {
      if (x2 < prop.x1) {
        console.log('no')
        this.verticalWall = 0;
        this.horisontalWall = 0;
      } else if (y2 < prop.y1) {
        console.log('no')
        this.horisontalWall = 0;
        this.verticalWall = 0;
      } else if (y1 > prop.y2) {
        console.log('no')
        this.horisontalWall = 0;
        this.verticalWall = 0;
      } else if (x1 > prop.x2) {
        console.log('no')
        this.horisontalWall = 0;
        this.verticalWall = 0;
      } else {
        if (this.velocityX) {
        if (x2 >= prop.x1 && x1 < prop.x1 && this.velocityX > 0) {
          this.x -= x2 - prop.x1
        } else
        if (x1 <= prop.x2 && x2 > prop.x2 && this.velocityX < 0) {
          this.x += x1 - prop.x2
        }
          this.verticalWall = Math.sign(this.velocityX);
        }
        if (this.velocityY) {
          if (y2 >= prop.y1 && y1 < prop.y1 && this.velocityY > 0) {
            this.y -= y2 - prop.y1
          } else
          if (y1 <= prop.y2 && y2 > prop.y2 && this.velocityY < 0) {
            this.y += y1 - prop.y2
          }
          this.horisontalWall = Math.sign(this.velocityY);
        }
        console.log('collide');
        this.velocityX = 0;
        this.velocityY = 0;
        if (y2 > prop.y1 && y1 < prop.y1) {

        } else if ( y1 < prop.y2 && y2 > prop.y2) {
          
        }
      }
      
    })
  }
}