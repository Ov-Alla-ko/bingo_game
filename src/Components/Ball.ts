import { Container, Sprite, Texture } from 'pixi.js';
import { gsap } from 'gsap/all';
import Label from './Label';

export interface IBallSetting {
    firstBackground: Texture;
    secondBackground?: Texture;
    thirdBackground?: Texture;
    size: number;
    text?: Label;
}

export default class Ball extends Container {
    protected firstBackground: Texture;
    protected secondBackground: Texture;
    protected thirdBackground: Texture;
    protected secondBg: Sprite;
    protected firstBg: Sprite;
    protected thirdBg: Sprite;
    protected text: Label;
    protected number: Label;
    protected size: number;

    constructor(options: IBallSetting) {
        super();
        this.firstBackground = options.firstBackground;
        this.secondBackground = options.secondBackground;
        this.thirdBackground = options.thirdBackground;
        this.text = options.text;
        this.size = options.size;
        this.init();
    }

    protected init(): void {
        this.name = 'ball';
        this.firstBg = new Sprite(this.firstBackground);
        this.secondBg = new Sprite(this.secondBackground);
        this.thirdBg = new Sprite(this.thirdBackground);
        this.number = this.text;
        this.addChild(this.firstBg, this.number);
        this.height = this.size;
        this.width = this.size;
        this.number.zIndex = 100;
        this.number.x = ((this.width / this.transform.scale.x) - this.number.width) / 2;
        this.number.y = ((this.height / this.transform.scale.y) - this.number.height) / 2;
        this.pivot.set(((this.width / this.transform.scale.x)) / 2, (this.height / this.transform.scale.y) / 2);
    }

    public move(x: number, callback?): void {
        const roll = gsap.to(this, {
            rotation: -300,
            duration: 20,
            repeat: -1,
        });
        gsap.to(this, {
            duration: 2,
            x,
            ease: 'none',
            onComplete: () => {
                roll.pause();
                this.addChild(this.secondBg);
                if (callback) {
                    callback(Number(this.text.getValue()));
                }
            },
        });
    }

    public changeBall(): void {
        this.secondBg.alpha = 0;
        this.addChild(this.thirdBg);
    }

    public checkExtraNumbers(callback): void {
        callback(Number(this.text.getValue()));
    }

    public async animationExtraBalls(y): Promise<void> {
        await gsap.to(this, {
            y,
            alpha: 1,
            duration: 0.5,
            ease: 'none',

        });
    }
    public changeLabel(value: number) {
        this.number.removeLabelText(`${value}`);
        this.number.x = ((this.width / this.transform.scale.x) - this.number.width) / 2;
        this.number.y = ((this.height / this.transform.scale.y) - this.number.height) / 2;
    }
}
