/* eslint-env p5js */
/* exported Tile */
'use strict';

const Sprite = require('./sprite');

let pinkSpriteImg;
let pinkSpriteFrames = 36;
let pinkSpriteWidth = 180;
let pinkAnimation = [];

class Tile {
    constructor(sketch, config, colour, tileImages) {
        this.sketch = sketch;
        this.config = config;
        this.tileImages = tileImages;
        this.lastUpdate = this.sketch.millis();
        this.colour = colour;

        for (let i = 0; i < pinkSpriteFrames; i++) {
            let pos = i * pinkSpriteWidth;

            let img = [pos, 0, pinkSpriteWidth, pinkSpriteWidth];
            pinkAnimation.push(img);
        }

        pinkSpriteImg = new Sprite(this.sketch, pinkAnimation, 0, 0, 0.1);
    }

    update() {
        if (this.step()) {
            this.draw();
        }
    }

    step() {
        if (this.sketch.millis() - this.lastUpdate < this.config.lastUpdate) {
            return false;
        } else {
            return true;
        }
    }

    draw(posX, posY, tWidth, tHeight) {
        // pinkSpriteImg.show();
        // pinkSpriteImg.animate();

        this.sketch.push();

        this.sketch.noStroke();
        this.sketch.fill(this.colour);
        this.sketch.translate(posX, posY);
        this.sketch.rect(0, 0, tWidth, tHeight);

        this.sketch.pop();
    }
}

module.exports = Tile;