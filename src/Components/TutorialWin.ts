/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
import {
    Container, Sprite, Texture,
} from 'pixi.js';
import winCombination from '../data/WinCombinations';
import Label from './Label';
import WinFields from './WinFields';

export interface ITutorialWin {
background: Texture;
}

export default class TutorialWin extends Container {
    protected background: Texture;
    protected fourContainers: Container;

    constructor(options: ITutorialWin) {
        super();
        this.background = options.background;

        this.init();
        this.createWinFields();
    }

    protected async init() {
        const bgField = new Sprite(this.background);
        bgField.height = 800;

        this.addChild(bgField);
        console.log(bgField.height);
    }

    protected createWinFields(): void {
        let count = 0;
        let countCont = 0;
        let cont = null;
        // this.width = 3640;
        for (const y in winCombination) {
            // count = 1;

            if (count % 4 === 0) {
                cont = new Container();
                cont.name = `cont_${count / 4}`;
                this.addChild(cont);
            }
            const winComb = new WinFields({ array: y });
            const styleButtonLable = {
                fontFamily: 'Museo Slab',
                fontSize: 40,
                fontWeight: 'bold',
                fill: 0xFfFfFf,
            };

            const label = new Label({
                label: `${y}`,
                style: styleButtonLable,
            });

            label.y = 760;
            label.x = ((winComb.width / this.transform.scale.x) - label.width) / 2;

            winComb.height = 357;
            cont.width = 455;

            if (count % 4 <= 1) {
                winComb.y = 42;
                winComb.x = -5;
                if (count % 4 === 1) {
                    winComb.x = winComb.width - 1;
                }
                cont.addChild(winComb);
                winComb.addChild(label);
                this.addChild(cont);
            } else {
                winComb.y = winComb.height + 40;
                winComb.x = -5;
                if (count % 4 === 3) {
                    winComb.x = winComb.width - 1;
                }
                cont.addChild(winComb);
                winComb.addChild(label);
                this.addChild(cont);
            }

            count += 1;
            if (count % 4 === 0) {
                cont.x = cont.width * countCont;
                countCont += 1;
            }
        }
    }
}
