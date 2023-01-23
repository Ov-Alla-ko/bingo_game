/* eslint-disable import/no-mutable-exports */
import { gsap } from 'gsap';
import { Container, Texture } from 'pixi.js';
import Icon from './Icon';

interface ILoader {
  texture: Texture;
}
let instance = null;
class Preloader extends Container {
  protected iconOfLoader: Icon;
  protected texture: Texture;
  protected animation;

  constructor(options: ILoader) {
      super();
      this.texture = options.texture;
      this.init();
      if (!instance) {
          instance = this;
      }

      return instance;
  }

  private init(): void {
      this.iconOfLoader = new Icon({
          resource: this.texture,
          size: 2700,
      });
      this.addChild(this.iconOfLoader);
      this.pivot.set(((this.width / this.transform.scale.x)) / 2, (this.height / this.transform.scale.y) / 2);
  }

  public movePreloader(): void {
      this.alpha = 1;
      this.animation = gsap.to(this, {
          rotation: -360,
          duration: 150,
          repeat: -1,
          ease: 'none',
      });
  }
  public async stopPreloader(): Promise<void> {
      this.alpha = 0;
      this.animation.pause();
  }
}

export default Preloader;
