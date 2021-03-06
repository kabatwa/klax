/* eslint-env jest */
'use strict';

import Tile from '../src/tile.js';
import Bin from '../src/bin.js';
jest.mock('../src/tile.js');


window.fill = () => null;
window.millis = () => null;
window.pop = () => null;
window.push = () => null;
window.rect = () => null;
window.stroke = () => null;
window.strokeWeight = () => null;
window.translate = () => null;

const config = {
    'speed': 2,
    'lanes': 5,
    'tileSize': 4
};

describe('The bin should', () => {
    let bin;
    let tile;

    beforeAll(() => {
        bin = new Bin(config);
        tile = new Tile();
        tile.colour = 'green';
    });

    beforeEach(() => {
        Tile.mockClear();
    });

    test('be setup with some default', () => {
        expect(bin).toEqual({
          'bin': [
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ],
        'cols': 5,
        'config': config,
        'rows': 5,
        'tileHeight': 30,
        'tileWidth': 4
        });
    });

    test('create a 2D array board with all empty spaces', () => {
        expect(bin.make2DArray(2, 2)).toEqual([
            [-1, -1],
            [-1, -1]
        ]);
    });

    test('get the lowest row in a lane that doesn\'t already have a tile', () => {
        bin.bin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, tile],
            [-1, tile, tile, tile, tile]
        ];

        expect(bin.getLowestEmptyRow(0)).toBe(2);
        expect(bin.getLowestEmptyRow(1)).toBe(3);
        expect(bin.getLowestEmptyRow(2)).toBe(0);
    });

    test('return null when the lane is full of tiles when trying to get the lowest empty row', () => {
        bin.bin = [
            [tile, tile, tile, tile, tile]
        ];

        expect(bin.getLowestEmptyRow(0)).toBe(null);
    });

    test('put the tile at the lowest empty position in that column', () => {
        const tile1 = new Tile(config, 'red');
        tile1.colour = 'red';


        bin.bin = [
            [-1, -1, -1, tile, tile],
            [-1, tile, tile, tile, tile]
        ];

        // console.log(tile);

        const newBin = [
            [-1, -1, tile1, tile, tile],
            [-1, tile, tile, tile, tile]
        ];

        bin.pushToBin(tile1, 0);

        expect(bin.bin).toEqual(newBin);
    });

    test('return the tile and column back to the paddle if there are no empty spaces', () => {
        const tile1 = new Tile(config, 'red');

        bin.bin = [
            [-1, -1, -1, tile, tile],
            [tile, tile, tile, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        const newBin = [
            [-1, -1, -1, tile, tile],
            [tile, tile, tile, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        expect(bin.pushToBin(tile1, 1)).toEqual({'tile': tile1, 'col': 1});
        expect(bin.bin[1]).toEqual(newBin[1]);
    });

    test('remove tiles when it forms a vertical klax', () => {
        bin.bin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, tile, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        const newBin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        bin.checkForKlax(1, 2);

        expect(bin.bin).toEqual(newBin);
    });

    test('remove tiles when it forms a horizontal klax', () => {
        bin.bin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, tile],
            [-1, -1, -1, -1, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        const newBin = [
            [-1, -1, -1, -1, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        bin.checkForKlax(1, 4);

        expect(bin.bin).toEqual(newBin);
    });

    test('remove tiles when it forms a diagonal klax', () => {
        const tile1 = new Tile(config, 'red');

        bin.bin = [
            [-1, -1, tile, tile1, tile1],
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        const newBin = [
            [-1, -1, -1, tile1, tile1],
            [-1, -1, -1, -1, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        bin.checkForKlax(0, 2);

        expect(bin.bin).toEqual(newBin);
    });

    test('don\'t remove a tile when it forms no klaxes', () => {
        bin.bin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        const newBin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ];

        bin.checkForKlax(0, 3);

        expect(bin.bin).toEqual(newBin);

    });

    test('draw each tile in the bin', () => {
        let tile = new Tile();
        let tile1 = new Tile();

        bin.bin = [
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, tile, tile],
            [-1, -1, -1, -1, tile1],
            [-1, -1, -1, -1, tile1],
            [-1, -1, -1, -1, -1]
        ];

        expect(Tile.mock.instances[0].draw).not.toHaveBeenCalled();
        expect(Tile.mock.instances[1].draw).not.toHaveBeenCalled();

        bin.draw();

        expect(Tile.mock.instances[0].draw).toHaveBeenCalledTimes(4)
        expect(Tile.mock.instances[1].draw).toHaveBeenCalledTimes(2)

    });
});