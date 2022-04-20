class TwoTorial extends Phaser.Scene {
    constructor() {
        super("twoTorialScene");
    }

    preload() {
        this.load.image('2torial', './assets/TWOtorial.png');
        this.load.audio('sfx_select', './assets/select.mp3');
        
    } // end preload()

    create() {
        this.add.image(0, 0, '2torial').setOrigin(0, 0);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    } // end create()

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // two player
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('twoPlayScene');
        }
    } // end update()
} // end class 