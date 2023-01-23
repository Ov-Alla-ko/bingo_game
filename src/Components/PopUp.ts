import { Container, Sprite, Texture } from 'pixi.js';
import { gsap } from 'gsap';
import Label from './Label';
import Button from './Button';
import Scene from '../Mechanics/Scene';

export interface IPopSetting {
    label?: Label;
    resource: Texture;
    width?: number;
    button?: Button;
    names: string;

}

export default class PopUp extends Container {
    protected popUp: Sprite;
    protected resource: Texture;
    protected label?: Label;
    protected sizeWidth: number;
    protected button: Button;
    protected names: string;
    protected scene: Scene;

    constructor(options: IPopSetting) {
        super();
        this.resource = options.resource;
        this.label = options.label;
        this.sizeWidth = options.width;
        this.button = options.button;
        this.names = options.names;
        this.init();
    }

    protected init(): void {
        this.popUp = new Sprite(this.resource);
        this.addChild(this.popUp);

        if (this.label !== undefined) {
            this.addChild(this.label);
        }
        if (this.button !== undefined) {
            this.addChild(this.button);
        }
    }

    public addLabel(): void {
        this.addChild(this.label);
    }
}
