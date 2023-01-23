import { Container } from 'pixi.js';
import { gsap } from 'gsap';
import MyLoader from '../data/MyLoader';
import Game from '../index';
import Button from '../Components/Button';
import Label from '../Components/Label';
import PopUp from '../Components/PopUp';
import Scene from '../Mechanics/Scene';
import RequestMethods from '../data/Server';
import Preloader from '../Components/Preloader';

export default class StartPopUp extends Container {
    protected game: Game;
    protected pop: PopUp;
    protected button: Button;
    protected size: number;
    protected sizePop: number;
    protected label: Label;
    protected labelButton: Label;
    protected scene: Scene;
    protected getCoins: RequestMethods;
    protected preloader: Preloader;
    protected tintAdd: any;
    protected tintDelete:any;

    constructor(size, callback, preloader, callbackTintAll, callbackDeleteTint) {
        super();
        this.size = size;
        this.game = Game.getInstance();
        this.scene = Scene.getInstance();
        this.preloader = preloader;
        this.tintAdd = callbackTintAll;
        this.tintDelete = callbackDeleteTint;
        this.createPopUp(callback);
        this.init();
    }

    protected init(): void {
        this.pop = new PopUp({
            label: this.label,
            resource: MyLoader.getRecourse('popup'),
            width: this.width,
            button: this.button,
            names: 'StartpopUp',
        });

        this.sizePop = this.size / this.pop.width;
        this.addChild(this.pop);
        this.pop.scale.set(this.sizePop);
        this.label.x = this.pop.width / 2 + 20;
        this.label.y = this.pop.height / 3;
        this.button.alpha = 1;
        this.button.x = this.pop.width / 10;
        this.button.y = this.pop.height / 0.8;
        this.button.interactive = true;
        this.button.addEventBtn(async () => {
            this.pop.interactiveChildren = false;
            await new Promise((resolve, reject) => {
                resolve(gsap.to(this.button, {
                    alpha: 0,
                }));
            });
            this.movePopUp();
            // this.scene.startGame();
            this.tintAdd();
        });
    }

    protected createPopUp(callback): void {
        const styleLabel = {
            fontFamily: 'Museo Slab',
            fontSize: 80,
            fontWeight: 'bold',
            fill: 0x2E71A8,
        };
        const styleButtonLable = {
            fontFamily: 'Museo Slab',
            fontSize: 65,
            fontWeight: 'bold',
            fill: 0xFfFfFf,
        };

        this.label = new Label({
            label: 'How To Play',
            style: styleLabel,
        });
        this.label.name = 'HowToPlay';
        this.label.interactive = true;
        this.label.on('click', () => {
            callback();
        });
        this.label.addIcon({
            resource: MyLoader.getRecourse('icon_question'),
            positionStart: true,
            size: 70,
            margin: 10,
        });

        this.labelButton = new Label({
            label: 'Play for 120',
            style: styleButtonLable,
        });
        this.labelButton.name = 'PlayFor';

        this.labelButton.addIcon({
            resource: MyLoader.getRecourse('icon_coin'),
            positionStart: false,
            size: 90,
            margin: 10,
        });

        this.button = new Button({
            label: this.labelButton,
            resource: MyLoader.getRecourse('button'),
            width: 1080,
        });
    }
    public showButton():void {
        this.button.alpha = 1;
    }
    public movePopUp = async (): Promise<void> => {
        await gsap.to(this, {
            y: this.y + this.height,
            duration: 1,
            ease: 'none',
            onComplete: async () => {
                this.preloader.movePreloader();
                await this.getRequest();
                await this.preloader.stopPreloader();
                this.tintDelete();
                this.scene.startGame();
                this.pop.interactiveChildren = true;
            },

        });
    }
    public movePopUpUp = (): void => {
        gsap.to(this, {
            y: this.y - this.height,
            duration: 1,
            ease: 'none',

        });
    }

    protected async getRequest(): Promise<void> {
        this.getCoins = new RequestMethods();
        await this.getCoins.getCoins();
    }
}
