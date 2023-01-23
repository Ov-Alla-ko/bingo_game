import { Container, Sprite, Texture } from 'pixi.js';
import Label from './Label';

export interface ICellSetting{
    firstBackground: Texture;
    secondBackground?: Texture;
    text?: Label
    secondText?: Label

}

export default class Cell extends Container {
    protected firstBackground: Texture;
    protected secondBackground: Texture;
    protected text: Label;
    protected secondText: Label;
    protected number: Label;
    protected caseIcon: Sprite;
    protected firstBg: Sprite;
    protected secondBg:Sprite;

    constructor(options:ICellSetting) {
        super();
        this.firstBackground = options.firstBackground;
        this.secondBackground = options.secondBackground;
        this.text = options.text;
        this.secondText = options.secondText;
        this.init();
    }

    protected init(): void {
        this.name = 'cell';
        this.firstBg = new Sprite(this.firstBackground);
        this.secondBg = new Sprite(this.secondBackground);

        this.number = this.text;
        this.addChild(this.secondBg, this.firstBg, this.number);
        this.number.x = ((this.width / this.transform.scale.x) - this.number.width) / 2;
        this.number.y = ((this.height / this.transform.scale.y) - this.number.height) / 2;
        this.number.alpha = 0;
        this.height = 40;
        this.width = 67;
    }

    public showNumbers(): void {
        this.number.alpha = 1;
    }

    public matchNumbers(): void {
        this.number = this.secondText;
    }

    public changeTexture(texture: Texture) {
        this.firstBg.texture = texture;
    }

    public changeLabel(value: number) {
        this.number.removeLabelText(`${value}`);
        this.number.x = ((this.width / this.transform.scale.x) - this.number.width) / 2;
        this.number.y = ((this.height / this.transform.scale.y) - this.number.height) / 2;
    }

    public addTint(): void {
        this.firstBg.tint = 0xcccccc;
        this.secondBg.tint = 0xcccccc;
    }
    public deleteTint(): void {
        this.firstBg.tint = 0xffffff;
        this.secondBg.tint = 0xffffff;
    }
}
