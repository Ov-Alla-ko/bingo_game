import { Container, Sprite, Texture } from 'pixi.js';
import Cell from './Cell';
import Label from './Label';

export interface IGameField {
    background?: Texture;
    case?: Texture;
    case2?: Texture;
    alphaLabel?: number;
    cells: number[][];
}

export default class GameField extends Container {
    protected names: string;
    protected background: Texture;
    protected case: Texture;
    protected case2: Texture;
    protected cell: Cell;
    protected text: Label;
    protected secondText: Label;
    protected startIcon: Sprite;
    protected cells: number[][];
    protected arrCells: Cell[]=[];

    constructor(options: IGameField) {
        super();
        this.background = options.background;
        this.case = options.case;
        this.case2 = options.case2;
        this.cells = options.cells;
        this.init();
        // this.addTints();
    }

    protected init(): void {
        const styleLabel = {
            fontFamily: 'Museo Slab',
            fontSize: 73,
            fontWeight: 'bold',
            fill: 0x2E71A8
            ,
        };
        const styleLabel2 = {
            fontFamily: 'Museo Slab',
            fontSize: 73,
            fontWeight: 'bold',
            fill: 0xFFFFFF
            ,
        };

        this.name = 'field';
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                this.text = new Label({
                    label: `${this.cells[y][x]}`,
                    style: styleLabel,
                });
                this.secondText = new Label({
                    label: `${this.cells[y][x]}`,
                    style: styleLabel2,
                });

                this.cell = new Cell({
                    firstBackground: this.case,
                    text: this.text,
                    secondBackground: this.case2,
                    secondText: this.secondText,

                });

                this.cell.x = y * this.cell.width;
                this.cell.y = x * this.cell.height;
                if (x !== 2 || y !== 2) {
                    this.addChild(this.cell);
                    this.arrCells.push(this.cell);
                }
            }
        }
    }

    public showField(): void {
        for (let i = 0; i < this.arrCells.length; i++) {
            const element = this.arrCells[i];
            element.changeTexture(this.background);
            element.showNumbers();
        }
    }

    public restart(arrNumbers: number[][]) {
        let arr = [];
        this.cells = arrNumbers;

        arr = arr.concat(this.cells[0], this.cells[1], this.cells[2], this.cells[3], this.cells[4]);
        arr.splice(12, 1);
        for (let i = 0; i < this.arrCells.length; i++) {
            const cell = this.arrCells[i];
            cell.children[1].alpha = 1;

            cell.changeLabel(arr[i]);
        }

        this.showField();
        console.log();
    }

    public addTints(varible): void {
        for (let i = 0; i < this.arrCells.length; i++) {
            if (varible) {
                this.arrCells[i].addTint();
            }

            if (!varible) { this.arrCells[i].deleteTint(); }
        }
    }
}
