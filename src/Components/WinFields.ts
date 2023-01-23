import {
    Container, Sprite, Texture,
} from 'pixi.js';
import Cell from './Cell';
import Label from './Label';
import winCombination from '../data/WinCombinations';
import MyLoader from '../data/MyLoader';

export interface IWinField {
      array: string;
  }

export default class WinFields extends Container {
      protected background: Texture;
      protected cell: Cell;
      protected cells: number[][];
      protected array:string ;
      protected fieldWins:Container;
      protected myLoader: MyLoader;
      protected bgImage: Sprite;

      constructor(options: IWinField) {
          super();
          this.array = options.array;

          this.cells = [
              [8, 24, 42, 50, 62],
              [2, 16, 35, 53, 72],
              [1, 22, 0, 57, 70],
              [7, 20, 36, 54, 74],
              [9, 28, 34, 49, 64],
          ];

          this.init();
      }

      protected async init() {
          this.fieldWins = new Container();
          this.addChild(this.fieldWins);
          const bgField = new Sprite(MyLoader.getRecourse('win_field'));
          this.fieldWins.addChild(bgField);

          const styleLabel = {
              fontFamily: 'Museo Slab',
              fontSize: 50,
              fontWeight: 'bold',
              fill: 0x2E71A8,
          };
          const styleLabelWin = {
              fontFamily: 'Museo Slab',
              fontSize: 50,
              fontWeight: 'bold',
              fill: 0xFFFFFF,
          };
          let text;
          this.fieldWins.name = 'field_Wins';
          for (let y = 0; y < 5; y++) {
              for (let x = 0; x < 5; x++) {
                  text = new Label({
                      label: `${this.cells[x][y]}`,
                      style: styleLabel,
                  });

                  if (winCombination[this.array][y][x] === 100) {
                      text = new Label({
                          label: `${this.cells[x][y]}`,
                          style: styleLabelWin,
                      });
                      this.cell = new Cell({
                          firstBackground: MyLoader.getRecourse('orange_cell'),
                          text,
                      });

                      this.cell.width = 91;
                      this.cell.height = 125;
                      this.cell.x = y * this.cell.width + 49;
                      this.cell.y = x * this.cell.height + 82;

                      this.cell.showNumbers();
                      if (x !== 2 || y !== 2) {
                          this.fieldWins.addChild(this.cell);
                      }
                  } else {
                      this.cell = new Cell({
                          firstBackground: MyLoader.getRecourse('blue_cell'),
                          text,
                      });

                      this.cell.width = 91;
                      this.cell.height = 125;
                      this.cell.x = y * this.cell.width + 49;
                      this.cell.y = x * this.cell.height + 82;

                      this.cell.showNumbers();
                      if (x !== 2 || y !== 2) {
                          this.fieldWins.addChild(this.cell);
                      }
                  }
              }
          }
      }
}
