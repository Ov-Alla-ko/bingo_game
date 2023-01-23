/* eslint-disable no-loop-func */
/* eslint-disable operator-assignment */
/* eslint-disable guard-for-in */
import {
    Container, Sprite,
} from 'pixi.js';
import { gsap } from 'gsap';
import TutorialWin from '../Components/TutorialWin';
import Game from '../index';
import Button from '../Components/Button';
import Label from '../Components/Label';
import Scene from '../Mechanics/Scene';
import Icon from '../Components/Icon';
import MyLoader from '../data/MyLoader';

export default class SettingWindow extends Container {
      protected game: Game;
      protected icon: Icon;
      protected iconSecond: Icon;
      protected button: Button;
      protected label: Label;
      protected setting: Sprite;
      protected scene: Scene;
      protected labelButton: Label;
      protected rules: Label;
      protected container: Container;
      protected isTap : boolean;
      protected startX : number;
      protected isLongeX : number;
      protected sliderX : number;
      protected sliderX2 : number;
      protected sliderX3 : number;
      protected sliderX4 : number;
      protected myLoader: MyLoader;
      protected field: Sprite;
      protected arrayOfFields: any[]= [];

      constructor() {
          super();
          this.game = Game.getInstance();
          this.scene = Scene.getInstance();

          this.init();
      }

      private async init() {
          this.setting = new Sprite(MyLoader.getRecourse('setting'));
          this.addChild(this.setting);
          this.setting.height = this.scene.height;
          this.setting.width = this.scene.width;

          this.icon = new Icon({ resource: MyLoader.getRecourse('close'), size: 180 });
          this.icon.x = this.scene.width - 60;
          this.icon.y = 16;
          this.icon.interactive = true;
          this.icon.on('click', () => {
              this.closeSetting();
              this.container.interactive = false;
              this.arrayOfFields[0].interactive = false;

              this.iconSecond.alpha = 0;
          });
          this.addChild(this.icon);
          this.createButton();
          this.createRulesLabel();
          this.createTutorial();
          this.button.addEventBtn(() => {
              this.animations(1);
              this.container.alpha = 1;
              this.iconSecond.alpha = 1;
              this.arrayOfFields[0].interactive = true;
          });
          this.isTap = false;
          this.startX = 0;
          this.isLongeX = 0;

          for (let index = 0; index < this.arrayOfFields.length; index++) {
              this.arrayOfFields[index].on('pointermove', (event) => {
                  if (!event.target) return;
                  if (event.target.name === `cont_${index}` && this.isTap) {
                      this.isLongeX = event.data.global.x - this.startX;
                  }
              }).on('pointerdown', (event) => {
                  this.isTap = true;
                  this.startX = event.data.global.x;
              }).on('pointerup', () => {
                  this.isTap = false;
                  for (let i = 0; i < this.arrayOfFields.length; i++) {
                      if (this.isLongeX > 20) {
                          if (this.arrayOfFields[i].x === 3185) {
                              this.arrayOfFields[i].x = -455;
                              this.sliderX = this.arrayOfFields[i].x + 455;
                              this.animationsForSlider(this.arrayOfFields[i], this.sliderX);
                          } else {
                              this.sliderX2 = this.arrayOfFields[i].x + 455;
                              this.animationsForSlider(this.arrayOfFields[i], this.sliderX2);
                              console.log(11111111111111111111111, this.arrayOfFields[i].x);
                          }
                      }

                      if (this.isLongeX < -20 && this.isLongeX !== 0) {
                          if (this.arrayOfFields[i].x === -455) {
                              this.arrayOfFields[i].x = 3185;
                              this.sliderX3 = this.arrayOfFields[i].x - 455;
                              this.animationsForSlider(this.arrayOfFields[i], this.sliderX3);
                          } else {
                              this.sliderX4 = this.arrayOfFields[i].x - 455;
                              console.log(this.arrayOfFields[i].name);
                              this.animationsForSlider(this.arrayOfFields[i], this.sliderX4);
                              console.log(222222222222222, this.arrayOfFields[i].x);
                          }
                      }
                  }
              });
          }

          this.iconSecond = new Icon({
              resource: MyLoader.getRecourse('close'),
              size: 210,
          });
          this.addChild(this.iconSecond);
          this.iconSecond.x = this.scene.width - 40;
          this.iconSecond.y = 225;
          this.iconSecond.alpha = 0;
          this.iconSecond.interactive = true;
          this.iconSecond.on('click', () => {
              this.animations(0);
              this.container.alpha = 0;
              // this.container.interactive = false;
              this.arrayOfFields[0].interactive = false;
              this.iconSecond.alpha = 0;
          });
      }

      protected createTutorial(): void {
          this.container = new TutorialWin({ background: MyLoader.getRecourse('combinations_bg') });
          this.addChild(this.container);
          for (let index = 0; index < this.container.children.length; index++) {
              if (this.container.children[index].name !== null) {
                  this.arrayOfFields.push(this.container.children[index]);
              }
          }

          this.container.alpha = 0;
          this.container.y = 217;
          this.container.x = 0;
      }

      protected animations(alpha: number): void {
          gsap.to(this.container, {
              alpha,
              duration: 1,
          });
      }
      protected animationsForSlider(field, x: number): void {
          gsap.to(field, {
              x,
              duration: 0.5,
              onStart: () => { field.interactive = false; },
              onComplete: () => {
                  field.interactive = true;
              },
          });
      }

      protected createButton(): void {
          const styleButtonLable = {
              fontFamily: 'Museo Slab',
              fontSize: 18,
              fontWeight: 'bold',
              fill: 0xFfFfFf,
          };
          this.labelButton = new Label({
              label: 'Pay lines',
              style: styleButtonLable,
          });
          this.button = new Button({
              label: this.labelButton,
              resource: MyLoader.getRecourse('setting_button'),
              width: 2250,
          });
          this.button.interactive = true;
          this.button.x = this.width / 2 - 180;
          this.button.y = this.height / 2 + 10;
          this.addChild(this.button);
      }

      protected createRulesLabel(): void {
          const styleButtonLable = {
              fontFamily: 'Museo Slab',
              fontSize: 18,
              fontWeight: 'bold',
              fill: 0xFfFfFf,
          };
          this.rules = new Label({
              label: 'Official Rules',
              style: styleButtonLable,
          });

          this.rules.x = this.width / 2 - this.rules.width / 2;
          this.rules.y = this.height / 2 + (this.height / 4) - 30;
          this.addChild(this.rules);
      }

      public showSetting = (): void => {
          gsap.to(this, {
              alpha: 1,
              duration: 1,
              ease: 'none',

          });
      }

      protected closeSetting = (): void => {
          this.container.alpha = 0;
          gsap.to(this, {
              alpha: 0,
              duration: 1,
              ease: 'none',

          });
      }
}
