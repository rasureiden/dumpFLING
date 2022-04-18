let config = {
    type: Phaser.CANVAS,
    width: 672,
    height: 504,
    scene: [ Menu, Play ]
}

// game obj
let game = new Phaser.Game(config);

// reserve keyboard vars
let keyR, keyLEFT, keyRIGHT, keyUP, keyA, keyD, keyF;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;