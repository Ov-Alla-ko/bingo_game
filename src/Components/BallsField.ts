import { Container, Sprite, Texture } from 'pixi.js';
// eslint-disable-next-line import/namespace
import Ball from './Ball';
import Label from './Label';

export interface IBallsField {
    background?: Texture;
    secondBg?: Texture;
    thirdBg: Texture;
    case?: Texture;
    alphaLabel?: number;
    balls?: number[];
    appWidth: number;
    names:string
}

export default class BallsField extends Container {
    protected names: string;
    protected background: Texture;
    protected secondBg?: Texture;
    protected thirdBg: Texture;
    protected case: Texture;
    protected ball: Ball;
    protected startIcon: Sprite;
    protected balls: number[];
    protected appWidth: number;
    protected arrBalls: any[];

    constructor(options: IBallsField) {
        super();
        this.background = options.background;
        this.secondBg = options.secondBg;
        this.thirdBg = options.thirdBg;
        this.balls = options.balls;
        this.appWidth = options.appWidth;
        this.names = options.names;

        this.init();
    }

    protected init(): void {
        const styleLabel = {
            fontFamily: 'Museo Slab',
            fontSize: 50,
            fontWeight: 'bold',
            fill: 0x2E71A8,
        };
        this.name = this.names;

        for (let y = 0; y < this.balls.length; y++) {
            this.ball = new Ball({
                firstBackground: this.background,
                secondBackground: this.secondBg,
                thirdBackground: this.thirdBg,
                text: new Label({
                    label: `${this.balls[y]}`,
                    style: styleLabel,
                }),
                size: 39,
            });
            this.addChild(this.ball);
            this.ball.x = this.appWidth + (y * this.ball.width);
            this.ball.sortableChildren = true;
        }
    }

    public async showBalls(callback, scene): Promise<void> {
        await new Promise((resolve) => {
            let i = 0;
            for (let index = 0; index < this.balls.length; index++) {
                this.arrBalls = this.children;
                i += 1;
                setTimeout(async () => {
                    this.arrBalls[index].move(
                        this.arrBalls[index].x - 870,
                        callback,
                    );
                }, 100 * index);
            }

            setTimeout(async () => {
                await this.moveOut();
                resolve(i === this.balls.length - 1);
            }, 5000);
        });
    }

    protected async moveOut(): Promise<void> {
        for (let index = 0; index < this.balls.length; index++) {
            this.arrBalls[index].changeBall();
            this.arrBalls[index].move(
                this.arrBalls[index].x - 770,

            );
        }
    }
}
