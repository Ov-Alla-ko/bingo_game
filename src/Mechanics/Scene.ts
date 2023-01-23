/* eslint-disable no-return-await */
import 'pixi-spine';
import {
    Application, Container, Loader, Sprite, Texture,
} from 'pixi.js';

import Game from '../index';
import Button from '../Components/Button';
import StartPopUp from '../UI/StartPopUp';
import GameManager from './GameManager';
import Label from '../Components/Label';
import EndPopUp from '../UI/EndPopUp';
import SettingWindow from '../UI/SettingWindow';
import Preloader from '../Components/Preloader';
import MyLoader from '../data/MyLoader';

export default class Scene extends Container {
    protected game: Game;
    protected app: Application;
    protected bg: Sprite;
    protected tube: Sprite;
    protected pop: StartPopUp;
    protected popEnd: EndPopUp;
    protected buttonCollect: Button;
    protected buttonExtraNums: Button;
    protected manager: GameManager;
    protected labelButton: Label;
    protected setting: SettingWindow;
    protected preloader: Preloader;
    protected myLoader: MyLoader;
    protected loadersArray: Loader[]=[];
    protected character;
    private static instance: Scene;

    constructor() {
        super();
        this.game = Game.getInstance();
        console.log('game', this.game.app);

        this.app = this.game.app;
    }

    public static getInstance(): Scene {
        if (!Scene.instance) {
            Scene.instance = new Scene();
        }
        return Scene.instance;
    }

    public async init(): Promise<void> {
        this.createElements();
    }

    protected async createElements() {
        this.createBg();
        this.createTube();
        this.activeButtons();
        this.createSpine();
        this.getGameManager();
        this.createSettingWindow();
        this.createPreloader();
        this.createPopUp();
    }

    protected createSpine() {
        this.character = new PIXI.spine.Spine(MyLoader.getRecourseSpine('spine'));
        const height = 180;
        let sc = null;
        sc = height / this.character.height;
        this.character.scale.set(sc);
        this.character.y = 433;
        this.character.x = 100;

        this.addChild(this.character);
        setTimeout(async () => {
            await this.setAnimation('Kitty_idle_st', false);

            await this.setAnimation('Kitty_idle_loop', true);
        });
    }

    public async setAnimation(name: string, loop: boolean) {
        return await new Promise((resolve) => {
            this.character.state.setAnimation(0, name, loop);
            this.character.state.addListener({
                complete: () => resolve(true),
            });
        });
    }

    private createBg() {
        this.bg = new Sprite(MyLoader.getRecourse('bg'));
        this.bg.height = this.app.screen.height;
        this.bg.width = this.app.screen.width;
        this.addChild(this.bg);
        console.log(this.bg);
    }

    private createTube(): void {
        this.tube = new Sprite(MyLoader.getRecourse('tube'));
        const sizeTube = this.app.screen.width / this.tube.width;
        this.tube.scale.set(sizeTube);
        this.tube.y = 453;
        this.tube.zIndex = 100;
        this.addChild(this.tube);
    }
    public createPreloader(): void {
        this.preloader = new Preloader({
            texture: MyLoader.getRecourse('loader'),
        });
        this.preloader.y = 449;
        this.preloader.x = 226;
        this.preloader.alpha = 0;
        this.addChild(this.preloader);
    }

    protected createSettingWindow(): void {
        this.setting = new SettingWindow();
        this.setting.zIndex = 101;
        this.setting.alpha = 0;
        this.addChild(this.setting);
    }

    protected createCollectButton(resource: Texture): void {
        const styleButtonLable = {
            fontFamily: 'Museo Slab',
            fontSize: 18,
            fontWeight: 'bold',
            fill: 0xFfFfFf,
        };
        this.labelButton = new Label({
            label: 'Try again',
            style: styleButtonLable,

        });

        this.buttonCollect = new Button({
            label: this.labelButton,
            resource,
            width: 1280,
        });
        this.buttonCollect.y = 777;
        this.buttonCollect.x = 30;
        this.addChild(this.buttonCollect);
    }

    protected createNumbersButton(resource: Texture): void {
        const styleButtonLable = {
            fontFamily: 'Museo Slab',
            fontSize: 18,
            fontWeight: 'bold',
            fill: 0xFfFfFf,
        };
        this.labelButton = new Label({
            label: 'Extra numbers',
            style: styleButtonLable,

        });

        this.buttonExtraNums = new Button({
            label: this.labelButton,
            resource,
            width: 1280,
        });
        this.buttonExtraNums.y = 777;
        this.buttonExtraNums.x = 219;
        this.addChild(this.buttonExtraNums);
    }

    protected activeButtons(): void {
        this.createCollectButton(MyLoader.getRecourse('collect_button'));
        this.createNumbersButton(MyLoader.getRecourse('collect_button'));
    }

    public createPopUp(): void {
        this.pop = new StartPopUp(450, this.setting.showSetting, this.preloader,
            this.addTintForAll.bind(this), this.deleteTintForAll.bind(this));
        this.pop.y = 1010;
        this.addChild(this.pop);
        this.pop.movePopUpUp();
    }

    protected getGameManager(): void {
        this.manager = GameManager.getInstance(this.buttonExtraNums, this.buttonCollect);
    }

    public movePopUp() {
        this.pop.showButton();
        this.pop.movePopUpUp();
    }

    public addTintForAll(): void {
        const field = this.getChildByName('field');
        this.bg.tint = 0xcccccf;
        this.tube.tint = 0xcccccc;
        this.character.tint = 0xcccccc;
        this.buttonCollect.addTint(true);
        this.buttonExtraNums.addTint(true);
        // @ts-ignore
        field.addTints(true);
        console.log(this.getChildByName('field'));
    }

    public deleteTintForAll(): void {
        const field = this.getChildByName('field');
        this.bg.tint = 0xffffff;
        this.tube.tint = 0xffffff;
        this.character.tint = 0xffffff;
        // @ts-ignore
        field.addTints(false);
    }

    public startGame() {
        this.manager.hideField();
        this.buttonExtraNums.addTint(true);
        this.buttonCollect.addTint(true);
    }
}
