/* eslint-disable no-return-assign */
/* eslint-disable no-return-await */
import * as PIXI from 'pixi.js';
import {
    Application, Container, Loader,
} from 'pixi.js';
import { WebfontLoaderPlugin } from 'pixi-webfont-loader';
import Scene from './Mechanics/Scene';
import MyLoader from './data/MyLoader';

const globalAny:any = global;
globalAny.window.PIXI = PIXI;
Loader.registerPlugin(WebfontLoaderPlugin);

export default class Game {
    public app: Application;
    protected mainContainer: Container;
    protected scene: Scene;
    private static instance: Game;

    constructor() {
        this.buildGame();
    }

    public static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    public async buildGame() {
        await this.loadSceneAssets();
        await this.loadStartPopUpAssets();
        await this.loadFieldAssets();
        await this.loadBallsAssets();
        await this.loadHowToPlayAssets();
        await this.loadEndPopUpAssets();
        await this.loadSpineAssets();
        this.init();
        this.scene = Scene.getInstance();
        this.scene.init();
        this.mainContainer.addChild(this.scene);
        this.scene.sortableChildren = true;
    }

    private init() {
        this.app = new PIXI.Application({
            width: 450,
            height: 969,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
        });

        this.mainContainer = new Container();
        this.app.stage.addChild(this.mainContainer);
        document.body.appendChild(this.app.view);
    }

    public getApp() {
        return this.app;
    }

    private async loadSceneAssets(): Promise<void> {
        const sceneLoader = MyLoader.createLoader();
        const sceneAssets = {
            bg: './assets/l_g_v_bingo_cat_theme_background_1.png',
            tube: './assets/l_g_v_bingo_cat_theme_tube_p1.png',
            loader: './assets/load.png',
            collect_button: './assets/l_g_v_bingo_cat_theme_button.png',
        };

        await MyLoader.loadAssetsPack(sceneLoader, sceneAssets);
    }

    private async loadBallsAssets(): Promise<void> {
        const ballsLoader = MyLoader.createLoader();
        const ballsAssets = {
            ball_second: './assets/l_g_v_bingo_cat_theme_ball_3.png',
            static_ball: './assets/l_g_v_bingo_cat_theme_ball_1.png',
            ball_first: './assets/l_g_v_bingo_cat_theme_ball_2.png',

        };

        await MyLoader.loadAssetsPack(ballsLoader, ballsAssets);
    }

    private async loadFieldAssets(): Promise<void> {
        const fieldLoader = MyLoader.createLoader();
        const fieldAssets = {
            cell_bg: './assets/l_g_v_bingo_cat_theme_card_4.png',
            cell: './assets/l_g_v_bingo_cat_theme_card_1.png',
            cell_bg_2: './assets/l_g_v_bingo_cat_theme_card_3.png',

        };

        await MyLoader.loadAssetsPack(fieldLoader, fieldAssets);
    }

    private async loadHowToPlayAssets(): Promise<void> {
        const howToPlayLoader = MyLoader.createLoader();
        const howToPlayAssets = {
            setting: './assets/l_g_v_bingo_cat_theme_background_2.png',
            win_field: './assets/l_g_v_bingo_cat_theme_board_paylines.png',
            orange_cell: './assets/l_g_v_bingo_cat_theme_card_y_paylines.png',
            blue_cell: './assets/l_g_v_bingo_cat_theme_card_b_paylines.png',
            close: './assets/l_g_v_bingo_cat_theme_close_icon.png',
            combinations_bg: './assets/l_g_v_bingo_cat_theme_frame_paylines.png',
            setting_button: './assets/l_g_v_bingo_cat_theme_button_pay_lines_1.png',

        };

        await MyLoader.loadAssetsPack(howToPlayLoader, howToPlayAssets);
    }

    private async loadStartPopUpAssets(): Promise<void> {
        const startPopUpLoader = MyLoader.createLoader();
        const startPopUpAssets = {
            popup: './assets/l_g_v_bingo_cat_theme_frame_3.png',
            button: './assets/l_g_v_bingo_cat_theme_button_pop_up.png',
            icon_question: './assets/l_g_v_bingo_cat_theme_question.png',
            icon_coin: './assets/l_g_v_bingo_cat_theme_coin_icon.png',

        };

        await MyLoader.loadAssetsPack(startPopUpLoader, startPopUpAssets);
    }

    private async loadEndPopUpAssets(): Promise<void> {
        const endPopUpLoader = MyLoader.createLoader();
        const endPopUpAsset = {
            popupEnd: './assets/l_g_v_bingo_cat_theme_frame_1.png',
        };

        await MyLoader.loadAssetsPack(endPopUpLoader, endPopUpAsset);
    }

    private async loadSpineAssets() {
        const spineAssets = {
            spine: './assets/spine/Kitty.json',
        };

        const spineLoader = MyLoader.createLoader();
        await MyLoader.loadAssetsPack(spineLoader, spineAssets);
    }
}

Game.getInstance();
