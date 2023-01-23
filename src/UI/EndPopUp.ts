import { Container } from 'pixi.js';
import { gsap } from 'gsap';
import Game from '../index';
import Button from '../Components/Button';
import Label from '../Components/Label';
import PopUp from '../Components/PopUp';
import Scene from '../Mechanics/Scene';
import MyLoader from '../data/MyLoader';

export default class EndPopUp extends Container {
    protected game: Game;
    protected pop: PopUp;
    protected button: Button;
    protected size: number;
    protected sizePop: number;
    protected text:string;
    protected label: Label;
    protected labelButton: Label;
    protected scene: Scene;
    protected win : string;

    constructor(size, text) {
        super();
        this.size = size;
        this.game = Game.getInstance();
        this.scene = Scene.getInstance();
        this.text = text;
        this.createPopUp();
        this.init();
    }

    private init(): void {
        this.pop = new PopUp({
            label: this.label,
            resource: MyLoader.getRecourse('popupEnd'),
            width: this.width,

            names: 'EndtpopUp',
        });
        this.label.x = (this.pop.width / 2) - (this.label.width / 2);
        this.label.y = (this.pop.height / 2) - (this.label.height / 2);
        this.sizePop = this.size / this.pop.width;
        this.addChild(this.pop);
        this.pop.scale.set(this.sizePop);
    }

    protected createPopUp(): void {
        const styleLabel = {
            fontFamily: 'Museo Slab',
            fontSize: 100,
            fontWeight: 'bold',
            fill: 0xFF5818,
        };
        this.label = new Label({
            label: this.text,
            style: styleLabel,
        });
        this.label.name = 'luse';
    }

    public movePopUpDown = async (): Promise<void> => {
        await gsap.to(this, {
            y: 90,
            duration: 1,
            ease: 'none',

        });
    }

    public movePopUpUp = async (): Promise<void> => {
        await gsap.to(this, {
            y: -180,
            duration: 1,
            ease: 'none',
        });
    }

    public addIcon(resource): void {
        if (resource !== undefined) {
            this.label.addIcon({
                resource,
                positionStart: false,
                size: 70,
                margin: 10,
            });
        }
    }
}
