import { gsap } from 'gsap/all';
import { Container } from 'pixi.js';
import BallsField from '../Components/BallsField';
import Cell from '../Components/Cell';
import GameField from '../Components/GameField';
import Game from '../index';
import Scene from './Scene';
import Button from '../Components/Button';
import Ball from '../Components/Ball';
import Label from '../Components/Label';
import winCombination from '../data/WinCombinations';
import EndPopUp from '../UI/EndPopUp';
import RequestMethods from '../data/Server';
import MyLoader from '../data/MyLoader';

export default class GameManager {
    protected game: Game;
    protected scene: Scene;
    protected field: GameField;
    protected extraNumbersBtn: Button;
    protected buttonCollect: Button;
    protected ball: BallsField;
    protected ballForExtra: Ball;
    protected cell: Cell;
    protected cells: number[][] = [];
    protected balls: number[] = [];
    protected extraNumbers: number[]
    protected firstSetBalls: number[] = [];
    protected secondSetBalls: number[] = [];
    protected thirdSetBalls: number[] = [];
    protected arr: number[][] = [];
    protected isClick: boolean;
    protected isClick2: boolean;
    public isWinOrlose: string;
    protected popEnd: EndPopUp;
    protected win: boolean;
    protected winArray: boolean[];
    protected extraArr:Ball[];
    protected extraField: Container;
    protected index:number;
    protected firstField: BallsField[];
    protected secondField: BallsField;
    protected thirdField: BallsField;
    protected current:number;
    protected coinsUpdate: RequestMethods;
    private static instance: GameManager;

    constructor(extraNumbersBtn, buttonCollect) {
        this.scene = Scene.getInstance();
        this.game = Game.getInstance();
        this.extraNumbersBtn = extraNumbersBtn;
        this.buttonCollect = buttonCollect;
        this.createArrays();
        this.createField();
        this.extraNumbersArr();
        this.createExtraNumber();
        this.tintAll();
    }

    public static getInstance(extraNumbersBtn, buttonCollect): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager(extraNumbersBtn, buttonCollect);
        }
        return GameManager.instance;
    }

    protected range(start: number, end: number) {
        const lengthArr = end - start + 1;
        // eslint-disable-next-line no-return-assign
        return Array.from({ length: lengthArr }, (_, i) => i += start);
    }

    protected shuffle(array: number[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    protected async createArrays() {
        const arrayForB = this.range(1, 90);
        const column = arrayForB.length / 5;
        this.cells = [];
        this.balls = this.range(1, 90);

        for (let index = 0; index < 5; index++) {
            this.cells.push(arrayForB.slice(index * column, (index * column) + column - 1));
        }

        for (let y = 0; y < this.cells.length; y++) {
            for (let x = 0; x < this.cells[y].length; x++) {
                this.shuffle(this.cells[y]);
                this.cells[y].length = 5;
            }
        }
        this.shuffle(this.balls);
        this.extraNumbers = this.balls.slice(25, 33);
        console.log(this.extraNumbers);
        this.balls.length = 25;
    }

    protected async createField(): Promise<void> {
        this.field = new GameField({
            background: MyLoader.getRecourse('cell_bg'),
            case: MyLoader.getRecourse('cell'),
            cells: this.cells,
            case2: MyLoader.getRecourse('cell_bg_2'),
        });

        this.field.y = 1104;
        this.scene.addChild(this.field);
        this.field.x = this.scene.width / 2;
        this.field.y = this.scene.height / 2;
        this.field.pivot.x = this.field.width / 2;
        this.field.pivot.y = this.field.height / 2;
    }

    protected createBallsField(ballsArray: number[], num): void {
        this.ball = new BallsField({
            background: MyLoader.getRecourse('ball_second'),
            secondBg: MyLoader.getRecourse('static_ball'),
            thirdBg: MyLoader.getRecourse('ball_first'),
            balls: ballsArray,
            appWidth: this.game.getApp().screen.width,
            names: `ball_field${num}`,
        });
        this.scene.addChild(this.ball);
        this.ball.x = 465;
        this.ball.y = 483;
    }

    protected async ballsTube(): Promise<void> {
        this.current = 0;
        this.firstSetBalls = this.balls.slice(0, 10);
        this.secondSetBalls = this.balls.slice(10, 15);
        this.thirdSetBalls = this.balls.slice(15, 25);
        this.arr = [this.firstSetBalls, this.secondSetBalls, this.thirdSetBalls];
        this.scene.setAnimation('Kitty_worry_loop', true);
        for (let index = 0; index < this.arr.length; index++) {
            this.current += 1;
            this.createBallsField(this.arr[index], this.current);

            await this.ball.showBalls(this.getMatch.bind(this), this.scene);
        }
    }

    public getMatch(num: number): void {
        let id;
        let newId;
        for (let i = 0; i < this.cells.length; i++) {
            for (let y = 0; y < this.cells[i].length; y++) {
                // eslint-disable-next-line no-unused-expressions
                this.cells[i][y];
                const element = this.cells[i];
                id = element.indexOf(num);
                newId = id + (5 * i);
                if (newId >= 12) newId -= 1;
                if (id !== -1 && this.cells[i][y] === num) {
                    // @ts-ignore
                    gsap.to(this.field.children[newId].children[1], {
                        alpha: 0,
                    });
                    this.cells[i][y] = 100;
                }
            }
        }
    }

    protected getWinCombinations(combinations, cardplayer): boolean {
        let checkCombination = true;
        for (let y = 0; y < combinations.length; y++) {
            for (let x = 0; x < combinations[y].length; x++) {
                if (combinations[y][x] === 100) {
                    if (cardplayer[y][x] === combinations[y][x] && checkCombination) checkCombination = true;
                    else checkCombination = false;
                }
            }
        }
        return checkCombination;
    }

    protected winCombinations(): boolean {
        this.win = false;
        this.winArray = [];

        for (const y in winCombination) {
            if (this.getWinCombinations(winCombination[y], this.cells) === true) {
                console.log('!!!!!!==== win nameMatrix ::', y);
                this.winArray.push(this.win);
                this.win = true;
                this.animation();
            } else {
                console.log(' no match!!!!!!!');
            }
        }
        return this.win;
    }

    public extraNumbersArr(): void {
        this.extraField = new Container();
        this.scene.addChild(this.extraField);
        let positionX = 172;
        let positionX2 = -56;

        const styleLabel = {
            fontFamily: 'Museo Slab',
            fontSize: 50,
            fontWeight: 'bold',
            fill: 0x2E71A8,
        };
        for (let i = 0; i < this.extraNumbers.length; i++) {
            positionX += 57;
            positionX2 += 57;
            this.ballForExtra = new Ball({
                firstBackground: MyLoader.getRecourse('static_ball'),
                text: new Label({
                    label: `${this.extraNumbers[i]}`,
                    style: styleLabel,
                }),
                size: 42,
            });

            this.extraField.addChild(this.ballForExtra);
            this.ballForExtra.alpha = 0;
            if (i < (this.extraNumbers.length / 2)) {
                this.ballForExtra.y = 307;
                this.ballForExtra.x = positionX;
            } else {
                this.ballForExtra.y = 367;
                this.ballForExtra.x = positionX2;
            }
        }

        console.log(this.extraNumbers, this.ballForExtra);
    }

    protected async createExtraNumber(): Promise<void> {
        this.index = 0;

        this.extraNumbersBtn.addEventBtn(async () => {
            if (this.isClick) return;
            this.isClick = true;
            this.extraNumbersBtn.addTint(true);
            this.buttonCollect.addTint(true);
            this.buttonCollect.interactive = false;
            this.index += 1;
            // @ts-ignore

            await this.scene.setAnimation('Kitty_worry_st', false);
            this.scene.setAnimation('Kitty_worry_loop', true);
            await this.popEnd.movePopUpUp();
            // @ts-ignore
            await this.extraField.children[this.index - 1].animationExtraBalls(this.extraField.children[this.index - 1].y);
            // @ts-ignore
            this.extraField.children[this.index - 1].checkExtraNumbers(this.getMatch.bind(this));

            this.scene.removeChild(this.popEnd);
            this.winCombinations();
            this.winLabel();
            await this.popEnd.movePopUpDown();
            this.animation();

            this.buttonCollect.addTint(false);
            this.buttonCollect.interactive = true;
            if (this.extraNumbers.length >= this.index + 1) {
                this.extraNumbersBtn.addTint(false);
                this.isClick = false;
            } else {
                this.extraNumbersBtn.addTint(true);
                this.isClick = true;
                this.extraNumbersBtn.interactive = false;
            }
        });
    }

    public restart(arrNumbers: number[]) {
        this.extraNumbers = arrNumbers;
        this.index = 0;
        for (let i = 0; i < this.extraNumbers.length; i++) {
            const cell = this.extraField.children[i];
            cell.alpha = 0;
            // @ts-ignore
            cell.changeLabel(this.extraNumbers[i]);
        }
    }

    protected createPopUpEnd(): void {
        this.popEnd = new EndPopUp(400, this.isWinOrlose);
        this.popEnd.y = -this.popEnd.height;
        this.popEnd.x = 25;
        this.scene.addChild(this.popEnd);
    }

    protected async winLabel(): Promise<void> {
        let icon;
        const styleButtonLable = {
            fontFamily: 'Museo Slab',
            fontSize: 18,
            fontWeight: 'bold',
            fill: 0xFfFfFf,
        };
        if (this.win) {
            this.isWinOrlose = `WIN  ${this.winArray.length * 100}`;

            icon = MyLoader.getRecourse('icon_coin');
            const label = new Label({
                label: `Collect ${this.winArray.length * 100}`,
                style: styleButtonLable,
            });
            this.buttonCollect.changeLabel(true, label);
        } else this.isWinOrlose = 'TRY AGAIN !';
        this.createPopUpEnd();
        this.popEnd.addIcon(icon);
    }

    protected async animation() {
        await this.scene.setAnimation('Kitty_worry_end', false);
        if (this.winArray.length > 0) {
            await this.scene.setAnimation('Kitty_happy_st', false);
            await this.scene.setAnimation('Kitty_happy_loop', false);
            await this.scene.setAnimation('Kitty_happy_end', false);
        } else {
            await this.scene.setAnimation('Kitty_sad_st', false);
            await this.scene.setAnimation('Kitty_sad_loop', false);
            await this.scene.setAnimation('Kitty_sad_end', false);
        }
        await this.scene.setAnimation('Kitty_idle_st', false);
        await this.scene.setAnimation('Kitty_idle_loop', true);
    }

    protected restartGame = async () => {
        this.index = 0;
        console.log('restart');
        this.createArrays();
        this.isClick = false;

        this.arr = [];
        this.scene.removeChild(this.ballForExtra);
        await this.scene.movePopUp();
        this.field.restart(this.cells);
        this.restart(this.extraNumbers);
        console.log('----------------------------------');
        const styleButtonLable = {
            fontFamily: 'Museo Slab',
            fontSize: 18,
            fontWeight: 'bold',
            fill: 0xFfFfFf,
        };
        const label = new Label({
            label: 'Try again',
            style: styleButtonLable,
        });
        this.buttonCollect.changeLabel(true, label);
        this.buttonCollect.addTint(true);
        this.extraNumbersBtn.interactive = false;
        this.extraNumbersBtn.addTint(true);

        this.scene.removeChild(this.scene.getChildByName('ball_field1'));
        this.scene.removeChild(this.scene.getChildByName('ball_field2'));
        this.scene.removeChild(this.scene.getChildByName('ball_field3'));
    }

    protected tintAll(): void {
        // this.scene.tint = 0xe6e6fa;
    }

    public async hideField(): Promise<void> {
        this.coinsUpdate = new RequestMethods();
        this.isClick2 = false;
        this.field.showField();
        await this.ballsTube();
        this.winCombinations();
        this.winLabel();
        await this.popEnd.movePopUpDown();
        this.animation();
        this.extraNumbersBtn.addTint(false);
        this.buttonCollect.addTint(false);
        this.extraNumbersBtn.interactive = true;
        this.buttonCollect.interactive = true;
        this.buttonCollect.addEventBtn(async () => {
            if (this.isClick2) return;
            this.isClick2 = true;
            await this.popEnd.movePopUpUp();
            this.extraNumbersBtn.interactive = false;
            this.buttonCollect.interactive = false;

            const coins = this.winArray.length * 100 - 120;
            await this.coinsUpdate.updateCoins(coins);

            this.restartGame();
            this.scene.removeChild(this.popEnd);
        });
    }
}
