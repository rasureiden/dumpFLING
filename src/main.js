// mod by eden hou. dumpFLING. 4/20/22 (haha). project development duration: 5 days, probably 15-20 hrs total.
// Points Breakdown:
// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)  --> making dumplings
// Implement a simultaneous two-player mode. In this mode there are two rockets at the same time, each with its own (key) controls, each capable of independent firing. (30)  --> making dumplings with a friend
// Implement parallax scrolling (10)  
// (60) + (30) + (10) = [100]
// EXTRA NOTE: "explosion" (wrapping) sfx is kind of quiet, but it's there! also, i recorded and made all sounds myself, along with all new artwork :)
// referenced Prof. Jim Whitehead's lecture videos for simultaneous two player basics.

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, OneTorial, TwoTorial, OnePlayer, TwoPlayer ]
}

// game object
let game = new Phaser.Game(config);

// reserve keyboard vars
let keyR, keyM, keyLEFT, keyRIGHT, keyUP, keyA, keyD, keyW;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;