import { Engine } from "./engine";

export class Scene {
  name = 'example';
  isActive = true;
  game: Engine;
  nextScene = 'loading'
  constructor(game: Engine) {
    this.game= game;
  }

  init() {
    this.isActive = true;
  }

  render(time) {

  }
  stop(scene?: string) {
    this.isActive = false;
    this.nextScene = scene ? scene : this.nextScene;
  }
}