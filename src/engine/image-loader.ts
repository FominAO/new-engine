export class ImageLoader {
  imageFiles = {};
  images = {}
  constructor(imageFiles) {
    this.imageFiles = imageFiles;
  }
  
  load() {
    const promises = [];
    for (let key in this.imageFiles) {
      promises.push(this.loadImage(key, this.imageFiles[key]))
    }
    return Promise.all(promises);
  }

  loadImage(name, src) {
    return new Promise((resolve) => {
      const image = new Image();
      this.images[name] = image;
      image.src = src;
      image.onload = (name) => { resolve(name) }
    })
  }
}