/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-return-await */
import {
    Loader, Texture,
} from 'pixi.js';

export default class MyLoader {
    static arrLoaders: Loader[] = [];

    public static createLoader(): Loader {
        const loader = new Loader();
        MyLoader.arrLoaders.push(loader);
        return loader;
    }

    public static loadAssets(loaderObject): void {
        console.log(MyLoader.arrLoaders);
        loaderObject.load();
    }

    public static async loadAssetsPack(loader: Loader, loaderObject) {
        console.log(MyLoader.arrLoaders);
        return await new Promise((resolve) => {
            for (const key in loaderObject) {
                if (Object.prototype.hasOwnProperty.call(loaderObject, key)) {
                    loader.add(`${key}`, `${loaderObject[key]}`);
                }
            }

            loader.load(() => {
                resolve(true);
            });
        });
    }

    public static async checkLoad(): Promise<boolean> {
        return await new Promise((resolve) => {
            for (let index = 0; index < this.arrLoaders.length; index++) {
                if (this.arrLoaders[index].progress !== 0) {
                    console.log(this.arrLoaders[index].progress);
                }
            } resolve(true);
        });
    }

    public static getRecourse(name: string): Texture {
        let texture = null;
        for (let i = 0; i < this.arrLoaders.length; i++) {
            if (this.arrLoaders[i].resources[name]) {
                texture = this.arrLoaders[i].resources[name].texture;
            }
        }

        return texture;
    }

    public static getRecourseSpine(name: string): any {
        let texture = null;
        for (let i = 0; i < this.arrLoaders.length; i++) {
            if (this.arrLoaders[i].resources[name]) {
                texture = this.arrLoaders[i].resources[name].spineData;
            }
        }

        return texture;
    }
}
