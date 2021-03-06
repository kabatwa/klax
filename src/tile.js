/* eslint-env p5js */
/* exported Tile */
'use strict';

//TODO Create sprites when ready
// import Sprite from './sprite';

// let pinkSpriteImg;
// const pinkSpriteFrames = 36;
// const pinkSpriteWidth = 180;
// const pinkAnimation = [];

export default class Tile {
    constructor(config, colour) {
        this.config = config;
        this.lastUpdate = millis();
        this.colour = colour;

        //TODO Create sprites when ready
        // for (let i = 0; i < pinkSpriteFrames; i++) {
        //     const pos = i * pinkSpriteWidth;

        //     const img = [pos, 0, pinkSpriteWidth, pinkSpriteWidth];
        //     pinkAnimation.push(img);
        // }

        // pinkSpriteImg = new Sprite(pinkAnimation, 0, 0, 0.1);
    }

    //TODO check this is still being used and fix
    update(posX, posY, tWidth, tHeight) {
        this.draw(posX, posY, tWidth, tHeight);
    }

    step() {
        if (millis() - this.lastUpdate >= this.config.speed) {
            this.lastUpdate = millis();

            return true;
        } else {
            return false;
        }
    }

    draw(posX, posY, tWidth, tHeight) {
        // pinkSpriteImg.show();
        // pinkSpriteImg.animate();

        push();

        noStroke();
        fill(this.colour);
        translate(posX, posY);
        rect(0, 0, tWidth, tHeight);

        pop();
    }
}
