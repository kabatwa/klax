/* eslint-env p5js */
/// <reference path="../node_modules/@types/p5/global.d.ts" />
/* exported setup draw keyPressed preload */
'use strict';

import 'p5';
import Belt from './belt';
import Paddle from './paddle';
import Bin from './bin';

let belt;
let bin;
let paddle;
let klaxSpriteSheet = '../assets/klax-spritesheet-96x161.png';
let spritesheets = {};
let config;

window.preload = function () {
    spritesheets.pink = loadImage(klaxSpriteSheet);
};

window.setup = function () {
    // frameRate(1);
    config = {
        canvasWidth: 600,
        lanes: 5,
        beltSteps: 5,
        speed: 500,
        tileColours: {
            blue: color(0, 0, 255),
            green: color(0, 255, 0),
            orange: color(255, 128, 0),
            pink: color(255, 0, 255),
            red: color(255, 0, 0),
            yellow: color(255, 255, 0)
        },
        //TODO add node env parameter for debug true/false
        debug: true,
        tileSize: null
    };

    config.tileSize = config.canvasWidth / config.lanes;

    createCanvas(config.canvasWidth, config.canvasWidth);
    background(51);

    belt = new Belt(config);
    paddle = new Paddle(config);
    bin = new Bin(config);
};

window.draw = function () {
    background(51);

    bin.draw();
    belt.draw();
    paddle.draw();

    let droppedTiles = belt.step();

    if (droppedTiles.length !== 0) {
        droppedTiles.forEach((el) => {
            paddle.pushToPaddle(el.tile, el.col);
        });
    }
};

window.keyPressed = function () {
    switch (keyCode) {
        //left arrow
        case 37:
            paddle.left();
            break;

        //up arrow
        case 38: {
            let tile = paddle.removeTopTile();

            if (tile) {
                belt.pushTileToTop(tile.tile, tile.col);
            }

            break;
        }

        //right arrow
        case 39:
            paddle.right();
            break;

        //down arrow
        case 40: {
            /**
             * TODO This needs to cater for three actions:
             * 1. There's no room in the lane so do nothing
             * 2. There's room in the lane so push the tile to it
             * 3. There's room in the lane so push the tile and it forms a klax; increment score
             */
            let tile = paddle.removeTopTile();

            if (tile) {
                bin.pushToBin(tile.tile, tile.col);
            }
            break;
        }

        //a
        case 65:
            if (config.debug) {
                belt.addNewPurpleTile();
            }
            break;

        //s
        case 83:
            if (config.debug) {
                belt.addNewGreenTile();
            }
            break;

        //q
        case 81:
            if (config.debug) {
                frameRate(5);
                console.log('Framerate now 5fps');
            }
            break;
    }
};
